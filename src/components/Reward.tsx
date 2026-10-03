"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Github, Loader2, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CLAIM_KEY, SECRETS, onSecret, readFound } from "@/lib/secrets";
import { LiquidGlass } from "./LiquidGlass";
import { Logo } from "./Logo";

const REPO = "https://github.com/Kaleab-Shewangizaw/my-portfolio";

export function openReward() {
  window.dispatchEvent(new Event("kalx:reward"));
}

/** Opens once someone has found every secret, and asks how to reach them. */
export function Reward() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", github: "", note: "", website: "" });
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const claimed = () => {
      try {
        return !!localStorage.getItem(CLAIM_KEY);
      } catch {
        return false;
      }
    };
    const off = onSecret((_, count) => {
      if (count >= SECRETS.length && !claimed()) setTimeout(() => setOpen(true), 1600);
    });
    const manual = () => setOpen(true);
    window.addEventListener("kalx:reward", manual);
    return () => {
      off();
      window.removeEventListener("kalx:reward", manual);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setState("sending");
    try {
      const res = await fetch("/api/champions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, found: readFound() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      try {
        localStorage.setItem(CLAIM_KEY, new Date().toISOString());
      } catch {}
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }

  const field =
    "w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3.5 py-2.5 text-[15px] outline-none placeholder:text-[var(--faint)] focus:border-[var(--accent)] focus-visible:outline-none";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85] grid place-items-center overflow-y-auto bg-black/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reward-title"
            className="relative w-full max-w-md"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <LiquidGlass radius={28} bezel={24} depth={40} frost={18} className="p-6 sm:p-8">
              <button onClick={() => setOpen(false)} className="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-[var(--muted)] hover:text-[var(--fg)]" aria-label="Close">
                <X size={16} />
              </button>
              <motion.div className="w-fit" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
                <Logo size={56} intro />
              </motion.div>

              {state === "done" ? (
                <div className="mt-5">
                  <h2 id="reward-title" className="text-2xl font-semibold tracking-tight">Got it. You&apos;re a legend.</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">
                    I&apos;ll reach out about your reward{form.github ? <> and follow you on GitHub (@{form.github.replace(/^@/, "")})</> : null}. Thanks for poking around this much.
                  </p>
                  <a href={REPO} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[var(--fg)] px-5 text-sm font-medium text-[var(--bg)]">
                    <Star size={15} /> Star the repo on your way out
                  </a>
                </div>
              ) : (
                <>
                  <p className="mono mt-5 text-xs text-[var(--accent-text)]">
                    {SECRETS.length}/{SECRETS.length} secrets found
                  </p>
                  <h2 id="reward-title" className="mt-1 text-2xl font-semibold tracking-tight">You found every single one.</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">
                    Almost nobody gets here. Leave your name and a way to reach you and I&apos;ll send you a reward. Add your GitHub and I&apos;ll follow you too.
                  </p>
                  <form onSubmit={submit} className="mt-5 space-y-3">
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={field} autoComplete="name" maxLength={80} />
                    <input required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="Email or Telegram" className={field} maxLength={120} />
                    <div className="relative">
                      <Github size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                      <input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} placeholder="GitHub username (optional)" className={field + " pl-9"} maxLength={60} autoCapitalize="off" spellCheck={false} />
                    </div>
                    <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Which secret was the hardest? (optional)" rows={2} className={field + " resize-none"} maxLength={500} />
                    <input tabIndex={-1} aria-hidden className="hidden" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
                    {error && <p className="text-sm text-[var(--accent-text)]">{error}</p>}
                    <button disabled={state === "sending"} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] text-sm font-semibold text-black disabled:opacity-60">
                      {state === "sending" && <Loader2 size={15} className="animate-spin" />} Claim my reward
                    </button>
                  </form>
                  <a href={REPO} target="_blank" rel="noopener noreferrer" className="mono mt-4 inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--fg)]">
                    <Star size={12} /> Liked the hunt? Star the repo.
                  </a>
                </>
              )}
            </LiquidGlass>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
