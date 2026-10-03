import { collection, parseId } from "@/lib/testimonials";
import { isAdmin } from "@/lib/auth";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const _id = parseId((await params).id);
  if (!_id) return new Response("Not found", { status: 404 });
  const doc = await (await collection()).findOne({ _id }, { projection: { avatar: 1, status: 1 } });
  // Pending photos are only visible to the admin.
  if (!doc?.avatar || (doc.status !== "approved" && !(await isAdmin()))) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(doc.avatar.data.buffer), {
    headers: {
      "Content-Type": doc.avatar.type,
      "Cache-Control": doc.status === "approved" ? "public, max-age=86400, stale-while-revalidate=604800" : "private, no-store",
    },
  });
}
