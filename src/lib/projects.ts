import "server-only";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import { projects as builtIn, type Project } from "@/content/site";
import { db } from "./db";

/**
 * Projects live in two places. The ones in content/site.ts are built in; the
 * database can add new ones, override a built-in one, hide it or reorder it.
 */
export type ProjectDoc = {
  _id: string; // slug
  project?: Project; // full content: a new project, or an edited built-in one
  order?: number;
  hidden?: boolean;
  updatedAt: Date;
};

export type ManagedProject = Project & {
  builtIn: boolean; // defined in content/site.ts
  edited: boolean; // built-in, but overridden from the admin
  hidden: boolean;
};

export async function projectCollection() {
  return (await db()).collection<ProjectDoc>("projects");
}

/** Drops the admin-only flags. */
export function toProject(p: ManagedProject): Project {
  const { builtIn: _b, edited: _e, hidden: _h, ...project } = p; // eslint-disable-line @typescript-eslint/no-unused-vars
  return project;
}

function merge(docs: ProjectDoc[]): ManagedProject[] {
  const bySlug = new Map(docs.map((d) => [d._id, d]));
  const rows: { p: ManagedProject; order: number }[] = builtIn.map((p, i) => {
    const d = bySlug.get(p.slug);
    return { p: { ...(d?.project ?? p), slug: p.slug, builtIn: true, edited: !!d?.project, hidden: !!d?.hidden }, order: d?.order ?? i };
  });
  const known = new Set(builtIn.map((p) => p.slug));
  for (const d of docs) {
    if (known.has(d._id) || !d.project) continue;
    // New projects without an explicit position go to the end, oldest first.
    rows.push({ p: { ...d.project, slug: d._id, builtIn: false, edited: false, hidden: !!d.hidden }, order: d.order ?? 1e6 + d.updatedAt.getTime() / 1e9 });
  }
  return rows.sort((a, b) => a.order - b.order).map((r) => r.p);
}

/** Every project, hidden ones included. Falls back to the built-in list if the database is unreachable. */
export const getAllProjects = cache(async (): Promise<ManagedProject[]> => {
  try {
    return merge(await (await projectCollection()).find({}).toArray());
  } catch {
    return merge([]);
  }
});

/** The projects visitors see, in display order. */
export const getProjects = cache(async (): Promise<Project[]> =>
  (await getAllProjects()).filter((p) => !p.hidden).map(toProject),
);

export function isBuiltIn(slug: string) {
  return builtIn.some((p) => p.slug === slug);
}

/** Projects show up on almost every page (lists, palette, sitemap), so refresh them all. */
export function revalidateProjects() {
  revalidatePath("/", "layout");
}
