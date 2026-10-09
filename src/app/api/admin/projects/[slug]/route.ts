import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { parseProject } from "@/lib/projectSchema";
import { getAllProjects, isBuiltIn, projectCollection, revalidateProjects } from "@/lib/projects";
import { projectImageCollection } from "@/lib/projectImages";

type Ctx = { params: Promise<{ slug: string }> };

async function guard(params: Ctx["params"]) {
  if (!(await isAdmin())) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  const { slug } = await params;
  if (!(await getAllProjects()).some((p) => p.slug === slug)) return { error: NextResponse.json({ error: "Unknown project" }, { status: 404 }) };
  return { slug };
}

/** Save edited content. The slug never changes, since links and the image hang off it. */
export async function PUT(req: Request, { params }: Ctx) {
  const g = await guard(params);
  if (g.error) return g.error;
  const body = await req.json().catch(() => null);
  const project = parseProject({ ...body, slug: g.slug });
  if (typeof project === "string") return NextResponse.json({ error: project }, { status: 400 });
  await (await projectCollection()).updateOne({ _id: g.slug }, { $set: { project: { ...project, slug: g.slug }, updatedAt: new Date() } }, { upsert: true });
  revalidateProjects();
  return NextResponse.json({ ok: true });
}

/** Show or hide: { hidden: boolean }. */
export async function PATCH(req: Request, { params }: Ctx) {
  const g = await guard(params);
  if (g.error) return g.error;
  const body = await req.json().catch(() => null);
  if (typeof body?.hidden !== "boolean") return NextResponse.json({ error: "Expected { hidden }" }, { status: 400 });
  await (await projectCollection()).updateOne(
    { _id: g.slug },
    { $set: { hidden: body.hidden }, $setOnInsert: { updatedAt: new Date() } },
    { upsert: true },
  );
  revalidateProjects();
  return NextResponse.json({ ok: true });
}

/** A new project is deleted with its image. A built-in one is reset to what content/site.ts says. */
export async function DELETE(_: Request, { params }: Ctx) {
  const g = await guard(params);
  if (g.error) return g.error;
  const projects = await projectCollection();
  if (isBuiltIn(g.slug)) {
    await projects.updateOne({ _id: g.slug }, { $unset: { project: "" } });
  } else {
    await Promise.all([projects.deleteOne({ _id: g.slug }), (await projectImageCollection()).deleteOne({ _id: g.slug })]);
  }
  revalidateProjects();
  return NextResponse.json({ ok: true });
}
