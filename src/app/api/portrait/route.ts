import { siteImageCollection } from "@/lib/portrait";

export async function GET() {
  const doc = await (await siteImageCollection()).findOne({ _id: "portrait" });
  if (!doc) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(doc.data.buffer), {
    headers: {
      "Content-Type": doc.type,
      // URLs carry a ?v= version, so a replaced portrait gets a new URL.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
