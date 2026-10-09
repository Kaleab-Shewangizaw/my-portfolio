import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { parseProject } from "@/lib/projectSchema";
import { getAllProjects, projectCollection, revalidateProjects } from "@/lib/projects";

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

/** Add a new project. */
export async function POST(req: Request) {
  if (!(await isAdmin())) return unauthorized();
  const project = parseProject(await req.json().catch(() => null));
  if (typeof project === "string") return NextResponse.json({ error: project }, { status: 400 });
  if ((await getAllProjects()).some((p) => p.slug === project.slug)) {
    return NextResponse.json({ error: `A project with the slug "${project.slug}" already exists.` }, { status: 409 });
  }
  await (await projectCollection()).insertOne({ _id: project.slug, project, updatedAt: new Date() });
  revalidateProjects();
  return NextResponse.json({ slug: project.slug });
}

/** Save the display order: { order: [slug, slug, …] }. */
export async function PATCH(req: Request) {
  if (!(await isAdmin())) return unauthorized();
  const body = await req.json().catch(() => null);
  const known = new Set((await getAllProjects()).map((p) => p.slug));
  const order: unknown = body?.order;
  if (!Array.isArray(order) || order.some((s) => typeof s !== "string" || !known.has(s))) {
    return NextResponse.json({ error: "Bad order" }, { status: 400 });
  }
  await (await projectCollection()).bulkWrite(
    (order as string[]).map((slug, i) => ({
      updateOne: { filter: { _id: slug }, update: { $set: { order: i }, $setOnInsert: { updatedAt: new Date() } }, upsert: true },
    })),
  );
  revalidateProjects();
  return NextResponse.json({ ok: true });
}
