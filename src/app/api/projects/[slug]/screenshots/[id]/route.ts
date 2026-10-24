import { ObjectId } from "mongodb";
import { screenshotCollection } from "@/lib/projectImages";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  if (!ObjectId.isValid(id)) return new Response("Not found", { status: 404 });
  const doc = await (await screenshotCollection()).findOne({ _id: new ObjectId(id), slug });
  if (!doc) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(doc.data.buffer), {
    headers: {
      "Content-Type": doc.type,
      // Each upload gets a new id, so a URL always points at the same bytes.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
