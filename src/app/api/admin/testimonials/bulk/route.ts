import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { isAdmin } from "@/lib/auth";
import { collection, parseId } from "@/lib/testimonials";

const ACTIONS = ["approve", "reject", "pending", "delete"] as const;

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { ids, action } = await req.json().catch(() => ({}));
  if (!Array.isArray(ids) || ids.length === 0 || ids.length > 1000 || !ACTIONS.includes(action)) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const _ids = ids.map((id) => (typeof id === "string" ? parseId(id) : null)).filter((x): x is ObjectId => !!x);
  const c = await collection();
  let affected = 0;
  if (action === "delete") {
    affected = (await c.deleteMany({ _id: { $in: _ids } })).deletedCount;
  } else {
    const status = action === "approve" ? "approved" : action === "reject" ? "rejected" : "pending";
    affected = (await c.updateMany({ _id: { $in: _ids } }, { $set: { status, reviewedAt: new Date() } })).modifiedCount;
  }
  revalidatePath("/");
  revalidatePath("/testimonials");
  return NextResponse.json({ ok: true, affected });
}
