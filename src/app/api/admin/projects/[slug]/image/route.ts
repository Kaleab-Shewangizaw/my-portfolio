import { NextResponse } from "next/server";
import { Binary } from "mongodb";
import { isAdmin } from "@/lib/auth";
import { getAllProjects, revalidateProjects } from "@/lib/projects";
import { IMAGE_TYPES, MAX_IMAGE_BYTES, projectImageCollection } from "@/lib/projectImages";

async function guard(params: Promise<{ slug: string }>) {
  if (!(await isAdmin())) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  const { slug } = await params;
  if (!(await getAllProjects()).some((p) => p.slug === slug)) return { error: NextResponse.json({ error: "Unknown project" }, { status: 404 }) };
  return { slug };
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const g = await guard(params);
  if (g.error) return g.error;
  const file = (await req.formData().catch(() => null))?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (!IMAGE_TYPES.includes(file.type)) return NextResponse.json({ error: "Use a JPG, PNG or WebP image." }, { status: 400 });
  if (file.size > MAX_IMAGE_BYTES) return NextResponse.json({ error: "Image must be under 4 MB." }, { status: 400 });

  const updatedAt = new Date();
  await (await projectImageCollection()).replaceOne(
    { _id: g.slug },
    { data: new Binary(Buffer.from(await file.arrayBuffer())), type: file.type, updatedAt },
    { upsert: true },
  );
  revalidateProjects();
  return NextResponse.json({ url: `/api/projects/${g.slug}/image?v=${updatedAt.getTime()}` });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const g = await guard(params);
  if (g.error) return g.error;
  await (await projectImageCollection()).deleteOne({ _id: g.slug });
  revalidateProjects();
  return NextResponse.json({ ok: true });
}
