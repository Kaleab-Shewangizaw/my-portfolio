"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ImagePlus, Loader2, RotateCcw } from "lucide-react";
import { IMAGE_ACCEPT, checkImage, shrinkImage } from "./CoverUpload";

// The site shows the portrait at most ~340px wide, so 1200px is plenty for sharp screens.
const MAX_SIDE = 1200;

/** Upload or reset the portrait shown on the home and about pages. */
export function PortraitEditor({ uploaded: initial, fallback }: { uploaded: string | null; fallback: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [uploaded, setUploaded] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function upload(file: File) {
    const bad = checkImage(file);
    if (bad) return setErr(bad);
    setErr(null);
    setSaved(false);
    setBusy(true);
    try {
      const body = new FormData();
      body.append("file", await shrinkImage(file, MAX_SIDE));
      const res = await fetch("/api/admin/portrait", { method: "PUT", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(res.status === 401 ? "Signed out. Refresh and sign in again." : (data.error ?? "Upload failed."));
      setUploaded(data.url);
      setSaved(true);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    if (!confirm("Go back to the original portrait?")) return;
    setBusy(true);
    setSaved(false);
    const res = await fetch("/api/admin/portrait", { method: "DELETE" }).catch(() => null);
    setBusy(false);
    if (res?.status === 401) return setErr("Signed out. Refresh and sign in again.");
    if (!res?.ok) return setErr("Couldn't reset it.");
    setUploaded(null);
  }

  return (
    <section className="shell pt-24 lg:pt-28">
      <Link href="/admin/projects" className="label inline-flex items-center gap-1.5 hover:text-[var(--fg)]">
        <ArrowLeft size={13} /> Admin
      </Link>
      <h1 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1] tracking-[-0.04em]">Portrait</h1>
      <p className="mt-3 max-w-lg text-sm text-[var(--muted)]">Shown on the home and about pages. It&apos;s cropped to this shape, so a vertical photo with your face near the top works best.</p>

      <div className="mt-6 grid items-start gap-3 sm:grid-cols-[300px_1fr]">
        <div className="card p-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--surface-2)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={uploaded ?? fallback} alt="Current portrait" className="size-full object-cover" />
            {busy && (
              <div className="absolute inset-0 grid place-items-center bg-black/40">
                <Loader2 size={22} className="animate-spin text-white" />
              </div>
            )}
          </div>
        </div>

        <div className="card space-y-4 p-5 sm:p-6">
          <input
            ref={input}
            type="file"
            accept={IMAGE_ACCEPT}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (f) upload(f);
            }}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => input.current?.click()}
              disabled={busy}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--fg)] px-4 text-sm font-medium text-[var(--bg)] disabled:opacity-50"
            >
              <ImagePlus size={15} /> {uploaded ? "Replace photo" : "Upload a photo"}
            </button>
            {uploaded && (
              <button
                type="button"
                onClick={reset}
                disabled={busy}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-50"
              >
                <RotateCcw size={15} /> Use the original
              </button>
            )}
          </div>
          <p className="text-xs text-[var(--faint)]">JPG, PNG or WebP up to 15 MB. Large photos are resized before uploading. Saved as soon as it uploads.</p>
          {saved && <p className="text-sm text-[var(--muted)]">Saved. The site now shows the new portrait.</p>}
          {err && <p className="text-sm text-[var(--accent-text)]">{err}</p>}
        </div>
      </div>
    </section>
  );
}
