import { NextResponse } from "next/server";
import { collection, notify, TOPICS } from "@/lib/messages";

const recent = new Map<string, number[]>(); // best-effort per-instance rate limit

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (hits.length >= 5) return NextResponse.json({ error: "Too many messages. Try again in a few minutes." }, { status: 429 });
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
  const email = clean(body.email, 200);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 4000) : "";
  const topic = TOPICS.includes(body.topic as (typeof TOPICS)[number]) ? (body.topic as (typeof TOPICS)[number]) : TOPICS[0];

  if (name.length < 2) return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  if (message.length < 10) return NextResponse.json({ error: "Please write a little more." }, { status: 400 });

  try {
    const c = await collection();
    await c.insertOne({ topic, name, email, message, read: false, createdAt: new Date() } as never);
  } catch (e) {
    console.error("messages: insert failed", e);
    return NextResponse.json({ error: "Something went wrong on my side. Please try again." }, { status: 500 });
  }
  await notify({ topic, name, email, message }, new URL(req.url).origin);
  return NextResponse.json({ ok: true });
}
