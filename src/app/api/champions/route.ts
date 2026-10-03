import { NextResponse } from "next/server";
import { champions } from "@/lib/champions";

const recent = new Map<string, number[]>();
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 60 * 60_000);
  if (hits.length >= 3) return NextResponse.json({ error: "You've already sent this. I'll be in touch." }, { status: 429 });
  recent.set(ip, [...hits, now]);

  const body = await req.json().catch(() => ({}));
  if (clean(body.website, 100)) return NextResponse.json({ ok: true }); // honeypot
  const name = clean(body.name, 80);
  const contact = clean(body.contact, 120);
  const github = clean(body.github, 60).replace(/^@/, "").replace(/^https?:\/\/github\.com\//i, "").replace(/\/.*$/, "");
  const note = clean(body.note, 500);
  const found = Array.isArray(body.found) ? body.found.filter((x: unknown) => typeof x === "string").slice(0, 30) : [];

  if (name.length < 2) return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  if (contact.length < 3) return NextResponse.json({ error: "Add an email or Telegram so I can reach you." }, { status: 400 });
  if (github && !/^[a-z\d](?:[a-z\d-]{0,38})$/i.test(github)) return NextResponse.json({ error: "That GitHub username doesn't look right." }, { status: 400 });

  try {
    await (await champions()).insertOne({ name, contact, github, note, found, createdAt: new Date() } as never);
  } catch (e) {
    console.error("champions: insert failed", e);
    return NextResponse.json({ error: "Something went wrong on my side. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
