import { NextResponse } from "next/server";
import { Binary, ObjectId } from "mongodb";
import { isAdmin } from "@/lib/auth";
import { getAllProjects, revalidateProjects } from "@/lib/projects";
import { IMAGE_TYPES, MAX_IMAGE_BYTES, MAX_SCREENSHOTS, getProjectScreenshots, screenshotCollection } from "@/lib/projectImages";

type Ctx = { params: Promise<{ slug: string }> };

async function guard(params: Ctx["params"]) {
  if (!(await isAdmin())) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  const { slug } = await params;
  if (!(await getAllProjects()).some((p) => p.slug === slug)) return { error: NextResponse.json({ error: "Unknown project" }, { status: 404 }) };
  return { slug };
}

/** Add one screenshot to the end. Responds with the full list. */
export async function POST(req: Request, { params }: Ctx) {
  const g = await guard(params);
  if (g.error) return g.error;
  const file = (await req.formData().catch(() => null))?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (!IMAGE_TYPES.includes(file.type)) return NextResponse.json({ error: "Use a JPG, PNG or WebP image." }, { status: 400 });
  if (file.size > MAX_IMAGE_BYTES) return NextResponse.json({ error: "Image must be under 4 MB." }, { status: 400 });

  const shots = await screenshotCollection();
  const count = await shots.countDocuments({ slug: g.slug });
  if (count >= MAX_SCREENSHOTS) return NextResponse.json({ error: `Up to ${MAX_SCREENSHOTS} screenshots per project.` }, { status: 400 });
  await shots.insertOne({
    _id: new ObjectId(),
    slug: g.slug,
    data: new Binary(Buffer.from(await file.arrayBuffer())),
    type: file.type,
    order: count,
    createdAt: new Date(),
  });
  revalidateProjects();
  return NextResponse.json({ screenshots: await getProjectScreenshots(g.slug) });
}

/** Reorder: { ids: string[] } in the new order. Responds with the full list. */
export async function PATCH(req: Request, { params }: Ctx) {
  const g = await guard(params);
  if (g.error) return g.error;
  const body = await req.json().catch(() => null);
  const ids: unknown = body?.ids;
  if (!Array.isArray(ids) || !ids.every((id) => typeof id === "string" && ObjectId.isValid(id))) {
    return NextResponse.json({ error: "Expected { ids }" }, { status: 400 });
  }
  const shots = await screenshotCollection();
  await Promise.all(ids.map((id, order) => shots.updateOne({ _id: new ObjectId(id), slug: g.slug }, { $set: { order } })));
  revalidateProjects();
  return NextResponse.json({ screenshots: await getProjectScreenshots(g.slug) });
}
