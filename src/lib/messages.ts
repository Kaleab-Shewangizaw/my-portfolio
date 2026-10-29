import "server-only";
import type { ObjectId } from "mongodb";
import { db } from "./db";

export const TOPICS = ["A project", "Collaboration", "A question", "Just saying hi"] as const;

export type MessageDoc = {
  _id: ObjectId;
  topic: (typeof TOPICS)[number];
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date;
};

/** What the admin UI receives: plain JSON. */
export type Message = {
  id: string;
  topic: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export async function collection() {
  return (await db()).collection<MessageDoc>("messages");
}

export function toPublic(d: MessageDoc): Message {
  return {
    id: d._id.toHexString(),
    topic: d.topic,
    name: d.name,
    email: d.email,
    message: d.message,
    read: d.read,
    createdAt: d.createdAt.toISOString(),
  };
}

export async function listMessages(): Promise<Message[]> {
  const c = await collection();
  const docs = await c.find({}).sort({ createdAt: -1 }).limit(500).toArray();
  return docs.map(toPublic);
}

/** Push to the ntfy app. Best effort: a failed notification never loses the message. */
export async function notify(m: Pick<MessageDoc, "topic" | "name" | "email" | "message">, origin: string) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return;
  try {
    const res = await fetch("https://ntfy.sh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic,
        title: `${m.name} · ${m.topic}`,
        message: `${m.message.slice(0, 500)}\n\n— ${m.email}`,
        tags: ["envelope"],
        click: `${origin}/admin/messages`,
        actions: [{ action: "view", label: "Reply", url: `mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.topic}`)}` }],
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error("messages: ntfy responded", res.status);
  } catch (e) {
    console.error("messages: notify failed", e);
  }
}
