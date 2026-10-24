import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { Binary } from "mongodb";
import { isAdmin } from "@/lib/auth";
import { IMAGE_TYPES, MAX_IMAGE_BYTES } from "@/lib/projectImages";
import { siteImageCollection } from "@/lib/portrait";

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const file = (await req.formData().catch(() => null))?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (!IMAGE_TYPES.includes(file.type)) return NextResponse.json({ error: "Use a JPG, PNG or WebP image." }, { status: 400 });
  if (file.size > MAX_IMAGE_BYTES) return NextResponse.json({ error: "Image must be under 4 MB." }, { status: 400 });

  const updatedAt = new Date();
  await (await siteImageCollection()).replaceOne(
    { _id: "portrait" },
    { data: new Binary(Buffer.from(await file.arrayBuffer())), type: file.type, updatedAt },
    { upsert: true },
  );
  revalidatePath("/", "layout");
  return NextResponse.json({ url: `/api/portrait?v=${updatedAt.getTime()}` });
}

/** Go back to the default portrait in /public. */
export async function DELETE() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await (await siteImageCollection()).deleteOne({ _id: "portrait" });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
