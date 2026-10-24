import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { isAdmin } from "@/lib/auth";
import { revalidateProjects } from "@/lib/projects";
import { getProjectScreenshots, screenshotCollection } from "@/lib/projectImages";

/** Remove one screenshot. Responds with what's left. */
export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string; id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug, id } = await params;
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Unknown screenshot" }, { status: 404 });
  await (await screenshotCollection()).deleteOne({ _id: new ObjectId(id), slug });
  revalidateProjects();
  return NextResponse.json({ screenshots: await getProjectScreenshots(slug) });
}
