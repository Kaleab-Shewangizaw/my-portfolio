import { projectLogoCollection } from "@/lib/projectImages";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await (await projectLogoCollection()).findOne({ _id: slug });
  if (!doc) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(doc.data.buffer), {
    headers: {
      "Content-Type": doc.type,
      // URLs carry a ?v= version, so a replaced logo gets a new URL.
      "Cache-Control": "public, max-age=31536000, immutable",
      // An SVG opened directly can't run scripts or load anything.
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
