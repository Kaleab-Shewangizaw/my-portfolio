import "server-only";
import type { Binary } from "mongodb";
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
