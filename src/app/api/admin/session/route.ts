import { NextResponse } from "next/server";
import { checkPassword, endSession, startSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  // Small delay blunts password guessing.
  await new Promise((r) => setTimeout(r, 400));
  if (typeof password !== "string" || !checkPassword(password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  await startSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await endSession();
  return NextResponse.json({ ok: true });
}
