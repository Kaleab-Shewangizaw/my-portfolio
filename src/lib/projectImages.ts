import "server-only";
import type { Binary, ObjectId } from "mongodb";
import { db } from "./db";

export type ProjectImageDoc = {
  _id: string; // project slug
  data: Binary;
  type: string;
  updatedAt: Date;
};

export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export async function projectImageCollection() {
  return (await db()).collection<ProjectImageDoc>("project_images");
}

/** Slug → public image URL for every project that has an uploaded cover. Empty if the database is unreachable. */
export async function getProjectImages(): Promise<Record<string, string>> {
  try {
    const docs = await (await projectImageCollection()).find({}, { projection: { data: 0 } }).toArray();
    // The timestamp busts caches whenever the image is replaced.
    return Object.fromEntries(docs.map((d) => [d._id, `/api/projects/${d._id}/image?v=${d.updatedAt.getTime()}`]));
  } catch {
    return {};
  }
}

export const MAX_SCREENSHOTS = 5;

export type ScreenshotDoc = {
  _id: ObjectId;
  slug: string;
  data: Binary;
  type: string;
  order: number;
  createdAt: Date;
};

export type Screenshot = { id: string; url: string };

export async function screenshotCollection() {
  return (await db()).collection<ScreenshotDoc>("project_screenshots");
}

/** A project's screenshots in display order. Empty if the database is unreachable. */
export async function getProjectScreenshots(slug: string): Promise<Screenshot[]> {
  try {
    const docs = await (await screenshotCollection()).find({ slug }, { projection: { data: 0 } }).sort({ order: 1, createdAt: 1 }).toArray();
    // Ids are never reused, so the URL can be cached forever.
    return docs.map((d) => ({ id: d._id.toHexString(), url: `/api/projects/${slug}/screenshots/${d._id.toHexString()}` }));
  } catch {
    return [];
  }
}
