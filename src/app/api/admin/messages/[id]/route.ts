import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { collection } from "@/lib/messages";
import { parseId } from "@/lib/testimonials";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const _id = parseId((await params).id);
  const body = await req.json().catch(() => null);
  if (!_id || typeof body?.read !== "boolean") return NextResponse.json({ error: "Bad request" }, { status: 400 });
  await (await collection()).updateOne({ _id }, { $set: { read: body.read } });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const _id = parseId((await params).id);
  if (!_id) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  await (await collection()).deleteOne({ _id });
  return NextResponse.json({ ok: true });
}
