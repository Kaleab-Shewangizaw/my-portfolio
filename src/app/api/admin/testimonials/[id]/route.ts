import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { collection, parseId, type Status } from "@/lib/testimonials";

const STATUSES: Status[] = ["pending", "approved", "rejected"];

function refreshSite() {
  revalidatePath("/");
  revalidatePath("/testimonials");
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const _id = parseId((await params).id);
  const { status } = await req.json().catch(() => ({}));
  if (!_id || !STATUSES.includes(status)) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  await (await collection()).updateOne({ _id }, { $set: { status, reviewedAt: new Date() } });
  refreshSite();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const _id = parseId((await params).id);
  if (!_id) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  await (await collection()).deleteOne({ _id });
  refreshSite();
  return NextResponse.json({ ok: true });
}
