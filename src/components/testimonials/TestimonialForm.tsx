"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ImagePlus, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Logo } from "../Logo";
import { Star, TestimonialCard } from "./TestimonialCard";

const RELATIONS = ["Client", "Colleague", "Manager", "Collaborator"] as const;

/** Center-crops to a square and shrinks to 320px so photos stay tiny. */
async function prepareAvatar(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 320;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, 320, 320);
  let q = 0.86;
  let url = canvas.toDataURL("image/jpeg", q);
  while (url.length > 180_000 && q > 0.4) {
    q -= 0.12;
    url = canvas.toDataURL("image/jpeg", q);
  }
  return url;
}

export function TestimonialForm({ defaults }: { defaults?: { company?: string; project?: string } }) {
  const [f, setF] = useState({
    name: "",
    role: "",
    company: defaults?.company ?? "",
    relation: "Client" as (typeof RELATIONS)[number],
    project: defaults?.project ?? "",
    message: "",
    rating: 5 as number | null,
    link: "",
    website: "",
  });
  const [avatar, setAvatar] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((s) => ({ ...s, [k]: v }));

  async function onFile(file?: File | null) {
    if (!file) return;
    if (!/^image\/(jpeg|png|webp|heic|heif)$/.test(file.type) && !file.name.match(/\.(jpe?g|png|webp|heic)$/i)) {
      setError("Please choose a JPEG, PNG or WebP image.");
      return;
    }
    try {
      setAvatar(await prepareAvatar(file));
      setError(null);
    } catch {
      setError("Couldn't read that image. Try a JPEG or PNG.");
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setState("sending");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, avatar }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }

  const field =
    "w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3.5 py-3 text-[15px] outline-none transition-colors placeholder:text-[var(--faint)] focus:border-[var(--accent)] focus-visible:outline-none";

  if (state === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card mx-auto max-w-xl p-8 text-center sm:p-12">
        <div className="mx-auto w-fit">
          <Logo size={72} intro />
        </div>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight">Thank you, {f.name.split(" ")[0]}.</h2>
        <p className="mt-3 text-[var(--muted)]">
          Your testimonial is in. I read every one personally, and it&apos;ll appear on the site once I&apos;ve had a look. It really means a lot.
        </p>
        <div className="mx-auto mt-8 max-w-sm text-left">
          <TestimonialCard t={{ ...f, avatarSrc: avatar }} />
        </div>
        <Link href="/" className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-[var(--fg)] px-5 text-sm font-medium text-[var(--bg)]">
          Look around the site <ArrowRight size={15} />
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.15fr_1fr] lg:items-start">
      <form onSubmit={submit} className="card space-y-6 p-6 sm:p-8">
        {/* Photo */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              onFile(e.dataTransfer.files?.[0]);
            }}
            className={
              "group relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-dashed transition-colors " +
              (drag ? "border-[var(--accent)] bg-[var(--surface-2)]" : "border-[var(--line)] hover:border-[var(--accent)]")
            }
            aria-label={avatar ? "Change photo" : "Add a photo"}
          >
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt="" className="size-full object-cover" />
            ) : (
              <ImagePlus size={22} className="text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]" />
            )}
          </button>
          <div className="text-sm">
            <p className="font-medium">Your photo</p>
            <p className="mt-0.5 text-[var(--muted)]">Optional. Drop an image or click the circle. It&apos;s cropped to a square.</p>
            {avatar && (
              <button type="button" onClick={() => setAvatar(null)} className="mt-1.5 inline-flex items-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--fg)]">
                <X size={12} /> Remove
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="label mb-2 block">Name *</span>
            <input required value={f.name} onChange={(e) => set("name", e.target.value)} className={field} placeholder="Your name" autoComplete="name" maxLength={80} />
          </label>
          <label className="block">
            <span className="label mb-2 block">Your role</span>
            <input value={f.role} onChange={(e) => set("role", e.target.value)} className={field} placeholder="Founder" autoComplete="organization-title" maxLength={80} />
          </label>
          <label className="block">
            <span className="label mb-2 block">Company</span>
            <input value={f.company} onChange={(e) => set("company", e.target.value)} className={field} placeholder="Company name" autoComplete="organization" maxLength={80} />
          </label>
        </div>

        <fieldset>
          <legend className="label mb-2">How do you know Kaleab?</legend>
          <div className="flex flex-wrap gap-2">
            {RELATIONS.map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => set("relation", r)}
                aria-pressed={f.relation === r}
                className={
                  "rounded-full border px-4 py-2 text-sm transition-colors " +
                  (f.relation === r ? "border-transparent bg-[var(--fg)] text-[var(--bg)]" : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)]")
                }
              >
                {r}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="label mb-2 block">What did we work on?</span>
          <input value={f.project} onChange={(e) => set("project", e.target.value)} className={field} placeholder="project name" maxLength={80} />
        </label>

        <div>
          <span className="label mb-2 block">Rating</span>
          <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                type="button"
                key={i}
                role="radio"
                aria-checked={f.rating === i}
                aria-label={`${i} star${i > 1 ? "s" : ""}`}
                onClick={() => set("rating", f.rating === i ? null : i)}
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <Star on={!!f.rating && i <= f.rating} className="size-7" />
              </button>
            ))}
            <span className="mono ml-2 text-xs text-[var(--muted)]">{f.rating ? `${f.rating}/5` : "no rating"}</span>
          </div>
        </div>

        <label className="block">
          <span className="label mb-2 flex justify-between">
            <span>Your testimonial *</span>
            <span className={f.message.length > 1100 ? "text-[var(--accent-text)]" : ""}>{f.message.length}/1200</span>
          </span>
          <textarea
            required
            minLength={20}
            maxLength={1200}
            rows={6}
            value={f.message}
            onChange={(e) => set("message", e.target.value)}
            className={field + " resize-none"}
            placeholder="What was it like working together? What did he build, and what difference did it make?"
          />
        </label>

        <label className="block">
          <span className="label mb-2 block">LinkedIn or website</span>
          <input type="url" value={f.link} onChange={(e) => set("link", e.target.value)} className={field} placeholder="https://linkedin.com/in/…" maxLength={200} />
        </label>

        {/* Honeypot */}
        <input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} className="hidden" aria-hidden name="website" />

        <AnimatePresence>
          {error && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl bg-[var(--accent)]/15 px-4 py-3 text-sm text-[var(--accent-text)]" role="alert">
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--fg)] text-sm font-medium text-[var(--bg)] transition-opacity disabled:opacity-60"
        >
          {state === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Submit testimonial <ArrowRight size={16} />
            </>
          )}
        </button>
        <p className="text-center text-xs text-[var(--muted)]">Nothing goes live until Kaleab approves it. Your photo is only shown next to your testimonial.</p>
      </form>

      <div className="lg:sticky lg:top-6">
        <p className="label mb-3 px-1">Live preview: this is how it&apos;ll look</p>
        <motion.div layout>
          <TestimonialCard t={{ ...f, avatarSrc: avatar }} />
        </motion.div>
      </div>
    </div>
  );
}
