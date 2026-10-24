import "server-only";
import { db } from "./db";
import type { ProjectImageDoc } from "./projectImages";

/** Used when no portrait has been uploaded from the admin. */
export const DEFAULT_PORTRAIT = "/me.jpg";

// Site-wide images, keyed by name. Only "portrait" for now.
export async function siteImageCollection() {
  return (await db()).collection<ProjectImageDoc>("site_images");
}

/** The uploaded portrait's URL, or null if there isn't one or the database is unreachable. */
export async function getUploadedPortrait(): Promise<string | null> {
  try {
    const doc = await (await siteImageCollection()).findOne({ _id: "portrait" }, { projection: { data: 0 } });
    // The timestamp busts caches whenever the portrait is replaced.
    return doc ? `/api/portrait?v=${doc.updatedAt.getTime()}` : null;
  } catch {
    return null;
  }
}
