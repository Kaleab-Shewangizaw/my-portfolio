"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Image as ImageIcon, Mail, MailOpen, MessageSquareQuote, Reply, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Message } from "@/lib/messages";

export function MessageInbox({ items: initial }: { items: Message[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const unread = items.filter((m) => !m.read).length;

  async function setRead(id: string, read: boolean) {
    setItems((all) => all.map((m) => (m.id === id ? { ...m, read } : m)));
    const res = await fetch(`/api/admin/messages/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ read }) });
    if (res.status === 401) router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this message permanently?")) return;
    const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    if (res.status === 401) return router.refresh();
    if (res.ok) setItems((all) => all.filter((m) => m.id !== id));
  }

  return (
    <section className="shell pt-24 lg:pt-28">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">~/admin/messages</p>
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1] tracking-[-0.04em]">
            Messages {unread > 0 && <span className="mono align-middle text-base font-normal text-[var(--accent-text)]">{unread} new</span>}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/projects" className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm text-[var(--muted)] hover:text-[var(--fg)]">
            <ImageIcon size={15} /> Projects
          </Link>
          <Link href="/admin/testimonials" className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm text-[var(--muted)] hover:text-[var(--fg)]">
            <MessageSquareQuote size={15} /> Testimonials
          </Link>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="card p-10 text-center text-[var(--muted)]">No messages yet.</div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {items.map((m) => (
              <motion.article
                key={m.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className={"card p-5 sm:p-6 " + (m.read ? "" : "ring-2 ring-[var(--accent)]")}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-medium">
                      {!m.read && <span className="size-2 shrink-0 rounded-full bg-[var(--accent)]" aria-label="Unread" />}
                      {m.name}
                    </p>
                    <a href={`mailto:${m.email}`} className="mt-0.5 block break-all text-sm text-[var(--accent-text)] hover:underline">
                      {m.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">{m.topic}</span>
                    <span className="mono text-xs text-[var(--muted)]">
                      {new Date(m.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed">{m.message}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  <a
                    href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.topic}`)}`}
                    onClick={() => !m.read && setRead(m.id, true)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[var(--fg)] px-3.5 text-sm font-medium text-[var(--bg)]"
                  >
                    <Reply size={14} /> Reply
                  </a>
                  <button onClick={() => setRead(m.id, !m.read)} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--line)] px-3.5 text-sm">
                    {m.read ? <Mail size={14} /> : <MailOpen size={14} />} {m.read ? "Mark unread" : "Mark read"}
                  </button>
                  <button onClick={() => remove(m.id)} className="grid size-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--accent-text)]" aria-label="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
