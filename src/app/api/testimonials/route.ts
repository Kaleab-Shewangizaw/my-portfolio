import { NextResponse } from "next/server";
import { Binary } from "mongodb";
import { collection, RELATIONS } from "@/lib/testimonials";

const MAX_AVATAR_BYTES = 200 * 1024;
const recent = new Map<string, number[]>(); // best-effort per-instance rate limit

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (hits.length >= 5) return NextResponse.json({ error: "Too many submissions. Try again in a few minutes." }, { status: 429 });
  recent.set(ip, [...hits, now]);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never see this field.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 80);
  const role = clean(body.role, 80);
  const company = clean(body.company, 80);
  const project = clean(body.project, 80);
  const link = clean(body.link, 200);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 1200) : "";
  const relation = RELATIONS.includes(body.relation as (typeof RELATIONS)[number]) ? (body.relation as (typeof RELATIONS)[number]) : "Client";
  const rating = typeof body.rating === "number" && body.rating >= 1 && body.rating <= 5 ? Math.round(body.rating) : null;

  if (name.length < 2) return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  if (message.length < 20) return NextResponse.json({ error: "Please write at least a sentence or two." }, { status: 400 });
  if (link && !/^https?:\/\/\S+\.\S+/.test(link)) return NextResponse.json({ error: "That link doesn't look right. Include https://" }, { status: 400 });

  let avatar = null;
  if (typeof body.avatar === "string" && body.avatar) {
    const m = body.avatar.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
    if (!m) return NextResponse.json({ error: "Photo must be a JPEG, PNG or WebP image." }, { status: 400 });
    const buf = Buffer.from(m[2], "base64");
    if (buf.length > MAX_AVATAR_BYTES) return NextResponse.json({ error: "Photo is too large." }, { status: 400 });
    avatar = { data: new Binary(buf), type: m[1] };
  }

  try {
    const c = await collection();
    await c.insertOne({
      name,
      role,
      company,
      relation,
      project,
      message,
      rating,
      link,
      avatar,
      status: "pending",
      createdAt: new Date(),
      reviewedAt: null,
    } as never);
  } catch (e) {
    console.error("testimonials: insert failed", e);
    return NextResponse.json({ error: "Something went wrong on my side. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
