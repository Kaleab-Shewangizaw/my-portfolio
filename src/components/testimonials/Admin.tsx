"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Loader2, LogOut, RotateCcw, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Status, Testimonial } from "@/lib/testimonials";
import type { Champion } from "@/lib/champions";
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

type Tab = Status | "champions";

const TABS: { id: Tab; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Live" },
  { id: "rejected", label: "Rejected" },
  { id: "champions", label: "Champions" },
];

type BulkAction = "approve" | "reject" | "pending" | "delete";

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={
        "grid size-6 shrink-0 place-items-center rounded-md border transition-colors " +
        (checked ? "border-[var(--accent)] bg-[var(--accent)] text-black" : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--faint)]")
      }
    >
      {checked && <Check size={14} strokeWidth={3} />}
    </button>
  );
}

export function AdminDashboard({ items: initial, champions: initialChampions }: { items: Testimonial[]; champions: Champion[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [champs, setChamps] = useState(initialChampions);
  const [tab, setTab] = useState<Tab>(initial.some((t) => t.status === "pending") ? "pending" : "approved");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const shown = tab === "champions" ? [] : items.filter((t) => t.status === tab);
  const count = (s: Tab) => (s === "champions" ? champs.length : items.filter((t) => t.status === s).length);
  const allSelected = shown.length > 0 && shown.every((t) => selected.has(t.id));

  function switchTab(t: Tab) {
    setTab(t);
    setSelected(new Set());
  }

  function toggle(id: string) {
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(shown.map((t) => t.id)));
  }

  async function bulk(action: BulkAction, ids: string[]) {
    if (!ids.length) return;
    if (action === "delete" && !confirm(`Delete ${ids.length} testimonial${ids.length > 1 ? "s" : ""} permanently? This can't be undone.`)) return;
    setBusy("bulk");
    const res = await fetch("/api/admin/testimonials/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids, action }),
    });
    setBusy(null);
    if (res.status === 401) return router.refresh();
    if (!res.ok) return alert("Something went wrong.");
    const set = new Set(ids);
    if (action === "delete") setItems((all) => all.filter((t) => !set.has(t.id)));
    else {
      const status: Status = action === "approve" ? "approved" : action === "reject" ? "rejected" : "pending";
      setItems((all) => all.map((t) => (set.has(t.id) ? { ...t, status } : t)));
    }
    setSelected(new Set());
  }

  async function removeChampion(id: string) {
    if (!confirm("Remove this champion?")) return;
    const res = await fetch(`/api/admin/champions/${id}`, { method: "DELETE" });
    if (res.ok) setChamps((c) => c.filter((x) => x.id !== id));
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

  const ids = [...selected];

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

      <div className="mb-4 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-[var(--line)] p-1" role="tablist">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => switchTab(t.id)} className="relative shrink-0 rounded-full px-4 py-1.5 text-sm">
            {tab === t.id && <motion.span layoutId="admin-tab" className="absolute inset-0 rounded-full bg-[var(--fg)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <span className={"relative " + (tab === t.id ? "text-[var(--bg)]" : "text-[var(--muted)]")}>
              {t.label} <span className="mono text-xs opacity-70">{count(t.id)}</span>
            </span>
          </button>
        ))}
      </div>

      {tab === "champions" ? (
        champs.length === 0 ? (
          <div className="card p-10 text-center text-[var(--muted)]">Nobody has found all the secrets yet.</div>
        ) : (
          <div className="card divide-y divide-[var(--line)]">
            {champs.map((c) => (
              <div key={c.id} className="flex flex-wrap items-start justify-between gap-4 p-5">
                <div className="min-w-0">
                  <p className="font-medium">{c.name}</p>
                  <p className="mt-0.5 text-sm text-[var(--muted)]">{c.contact}</p>
                  {c.github && (
                    <a href={`https://github.com/${c.github}`} target="_blank" rel="noopener noreferrer" className="mono mt-1 inline-block text-sm text-[var(--accent-text)] hover:underline">
                      github.com/{c.github} ↗
                    </a>
                  )}
                  {c.note && <p className="mt-2 text-sm italic text-[var(--muted)]">“{c.note}”</p>}
                </div>
                <div className="flex items-center gap-3">
                  <span className="mono text-xs text-[var(--muted)]">
                    {c.found.length} found · {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <button onClick={() => removeChampion(c.id)} className="grid size-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--accent-text)]" aria-label="Remove">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : shown.length === 0 ? (
        <div className="card p-10 text-center text-[var(--muted)]">
          {tab === "pending" ? "All caught up. Share the invite link to collect more." : "Nothing here."}
        </div>
      ) : (
        <>
          {/* Selection toolbar */}
          <div className="card sticky top-3 z-30 mb-3 flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <label className="flex items-center gap-3 text-sm">
              <Checkbox checked={allSelected} onChange={toggleAll} label="Select all" />
              {selected.size ? (
                <span>
                  <span className="font-medium">{selected.size}</span> selected
                </span>
              ) : (
                <span className="text-[var(--muted)]">Select all {shown.length}</span>
              )}
            </label>
            <div className="flex flex-wrap items-center gap-1.5">
              {busy === "bulk" && <Loader2 size={16} className="mr-1 animate-spin text-[var(--muted)]" />}
              {tab !== "approved" && (
                <button disabled={!selected.size || !!busy} onClick={() => bulk("approve", ids)} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 text-sm font-medium text-black disabled:opacity-40">
                  <Check size={14} /> Approve
                </button>
              )}
              {tab === "approved" && (
                <button disabled={!selected.size || !!busy} onClick={() => bulk("pending", ids)} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--line)] px-3.5 text-sm disabled:opacity-40">
                  <RotateCcw size={14} /> Unpublish
                </button>
              )}
              {tab === "pending" && (
                <button disabled={!selected.size || !!busy} onClick={() => bulk("reject", ids)} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--line)] px-3.5 text-sm disabled:opacity-40">
                  <X size={14} /> Reject
                </button>
              )}
              <button disabled={!selected.size || !!busy} onClick={() => bulk("delete", ids)} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--line)] px-3.5 text-sm text-[var(--accent-text)] disabled:opacity-40">
                <Trash2 size={14} /> Delete{selected.size ? ` ${selected.size}` : ""}
              </button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((t) => {
                const on = selected.has(t.id);
                return (
                  <motion.div key={t.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col gap-2">
                    <div className={"relative flex-1 rounded-[22px] transition-shadow " + (on ? "ring-2 ring-[var(--accent)]" : "")}>
                      <button type="button" onClick={() => toggle(t.id)} className="absolute inset-0 z-10 rounded-[20px]" aria-label={`Select testimonial from ${t.name}`} />
                      <div className="absolute right-4 top-4 z-20">
                        <Checkbox checked={on} onChange={() => toggle(t.id)} label={`Select ${t.name}`} />
                      </div>
                      <TestimonialCard t={{ ...t, link: "", avatarSrc: t.hasAvatar ? `/api/testimonials/${t.id}/avatar` : null }} className="h-full [&>div:first-child]:pr-10" />
                    </div>
                    <div className="flex items-center justify-between gap-2 px-1">
                      <span className="mono text-xs text-[var(--muted)]">{new Date(t.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <div className="flex gap-1.5">
                        {t.status !== "approved" && (
                          <button onClick={() => bulk("approve", [t.id])} disabled={!!busy} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 text-sm font-medium text-black disabled:opacity-50">
                            <Check size={14} /> Approve
                          </button>
                        )}
                        {t.status === "approved" && (
                          <button onClick={() => bulk("pending", [t.id])} disabled={!!busy} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--line)] px-3.5 text-sm disabled:opacity-50" title="Take it off the site">
                            <RotateCcw size={14} /> Unpublish
                          </button>
                        )}
                        {t.status === "pending" && (
                          <button onClick={() => bulk("reject", [t.id])} disabled={!!busy} className="grid size-9 place-items-center rounded-full border border-[var(--line)] disabled:opacity-50" aria-label="Reject">
                            <X size={14} />
                          </button>
                        )}
                        <button onClick={() => bulk("delete", [t.id])} disabled={!!busy} className="grid size-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--accent-text)] disabled:opacity-50" aria-label="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </>
      )}
    </section>
  );
}
