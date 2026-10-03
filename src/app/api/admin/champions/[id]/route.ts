import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { champions } from "@/lib/champions";
import { parseId } from "@/lib/testimonials";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const _id = parseId((await params).id);
  if (!_id) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  await (await champions()).deleteOne({ _id });
  return NextResponse.json({ ok: true });
}
