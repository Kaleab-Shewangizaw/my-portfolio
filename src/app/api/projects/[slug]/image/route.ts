import { projectImageCollection } from "@/lib/projectImages";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await (await projectImageCollection()).findOne({ _id: slug });
  if (!doc) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(doc.data.buffer), {
    headers: {
      "Content-Type": doc.type,
      // URLs carry a ?v= version, so a replaced image gets a new URL.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
