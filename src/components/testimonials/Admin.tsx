"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Loader2, LogOut, RotateCcw, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Status, Testimonial } from "@/lib/testimonials";
import { Logo } from "../Logo";
import { TestimonialCard } from "./TestimonialCard";

export function AdminLogin() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const res = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    setBusy(false);
    if (res.ok) router.refresh();
    else setErr("Wrong password.");
  }

  return (
    <section className="shell grid min-h-[80svh] place-items-center pt-20">
      <form onSubmit={submit} className="card w-full max-w-sm p-8">
        <Logo size={40} intro />
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Review testimonials before they go live.</p>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
          autoComplete="current-password"
          placeholder="Password"
          className="mt-6 w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3.5 py-3 text-[15px] outline-none focus:border-[var(--accent)] focus-visible:outline-none"
        />
        {err && <p className="mt-2 text-sm text-[var(--accent-text)]">{err}</p>}
        <button disabled={busy || !pw} className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--fg)] text-sm font-medium text-[var(--bg)] disabled:opacity-50">
          {busy && <Loader2 size={15} className="animate-spin" />} Sign in
        </button>
      </form>
    </section>
  );
}

const TABS: { id: Status; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Live" },
  { id: "rejected", label: "Rejected" },
];

export function AdminDashboard({ items: initial }: { items: Testimonial[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [tab, setTab] = useState<Status>(initial.some((t) => t.status === "pending") ? "pending" : "approved");
  const [busy, setBusy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const shown = items.filter((t) => t.status === tab);
  const count = (s: Status) => items.filter((t) => t.status === s).length;

  async function setStatus(id: string, status: Status) {
    setBusy(id);
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    setBusy(null);
    if (res.ok) setItems((all) => all.map((t) => (t.id === id ? { ...t, status } : t)));
    else if (res.status === 401) router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this testimonial permanently?")) return;
    setBusy(id);
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    setBusy(null);
    if (res.ok) setItems((all) => all.filter((t) => t.id !== id));
  }

  async function copyInvite() {
    await navigator.clipboard.writeText(`${window.location.origin}/testimonials/new`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.refresh();
  }

  return (
    <section className="shell pt-24 lg:pt-28">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">~/admin/testimonials</p>
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1] tracking-[-0.04em]">Testimonials</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={copyInvite} className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--fg)] px-4 text-sm font-medium text-[var(--bg)]">
            {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy invite link"}
          </button>
          <button onClick={logout} className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm text-[var(--muted)] hover:text-[var(--fg)]">
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-1 rounded-full border border-[var(--line)] p-1 w-fit" role="tablist">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className="relative rounded-full px-4 py-1.5 text-sm">
            {tab === t.id && <motion.span layoutId="admin-tab" className="absolute inset-0 rounded-full bg-[var(--fg)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <span className={"relative " + (tab === t.id ? "text-[var(--bg)]" : "text-[var(--muted)]")}>
              {t.label} <span className="mono text-xs opacity-70">{count(t.id)}</span>
            </span>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="card p-10 text-center text-[var(--muted)]">
          {tab === "pending" ? "All caught up. Share the invite link to collect more." : "Nothing here."}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((t) => (
              <motion.div key={t.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col gap-2">
                <TestimonialCard t={{ ...t, avatarSrc: t.hasAvatar ? `/api/testimonials/${t.id}/avatar` : null }} className="flex-1" />
                <div className="flex items-center justify-between gap-2 px-1">
                  <span className="mono text-xs text-[var(--muted)]">{new Date(t.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <div className="flex gap-1.5">
                    {busy === t.id && <Loader2 size={16} className="m-2 animate-spin text-[var(--muted)]" />}
                    {t.status !== "approved" && (
                      <button onClick={() => setStatus(t.id, "approved")} disabled={!!busy} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 text-sm font-medium text-black disabled:opacity-50">
                        <Check size={14} /> Approve
                      </button>
                    )}
                    {t.status === "approved" && (
                      <button onClick={() => setStatus(t.id, "pending")} disabled={!!busy} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--line)] px-3.5 text-sm disabled:opacity-50" title="Take it off the site">
                        <RotateCcw size={14} /> Unpublish
                      </button>
                    )}
                    {t.status === "pending" && (
                      <button onClick={() => setStatus(t.id, "rejected")} disabled={!!busy} className="grid size-9 place-items-center rounded-full border border-[var(--line)] disabled:opacity-50" aria-label="Reject">
                        <X size={14} />
                      </button>
                    )}
                    <button onClick={() => remove(t.id)} disabled={!!busy} className="grid size-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--accent-text)] disabled:opacity-50" aria-label="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
