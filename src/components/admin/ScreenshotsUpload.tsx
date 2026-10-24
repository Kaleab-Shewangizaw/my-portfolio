"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImagePlus, Loader2, X } from "lucide-react";
import { IMAGE_ACCEPT, checkImage } from "./CoverUpload";

type Screenshot = { id: string; url: string };

const MAX = 5;

/** Add, remove and reorder up to five screenshots for a saved project's slideshow. */
export function ScreenshotsUpload({ slug, initial }: { slug: string; initial: Screenshot[] }) {
  const input = useRef<HTMLInputElement>(null);
  const [shots, setShots] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Every endpoint answers with the full, ordered list.
  async function call(url: string, init: RequestInit) {
    setBusy(true);
    setErr(null);
    const res = await fetch(url, init).catch(() => null);
    const data = await res?.json().catch(() => ({}));
    setBusy(false);
    if (res?.status === 401) return setErr("Signed out. Refresh and sign in again."), false;
    if (!res?.ok) return setErr(data?.error ?? "Something went wrong."), false;
    setShots(data.screenshots);
    return true;
  }

  async function upload(files: File[]) {
    for (const file of files.slice(0, MAX - shots.length)) {
      const bad = checkImage(file);
      if (bad) return setErr(bad);
      const body = new FormData();
      body.append("file", file);
      if (!(await call(`/api/admin/projects/${slug}/screenshots`, { method: "POST", body }))) return;
    }
  }

  function move(i: number, by: number) {
    const ids = shots.map((s) => s.id);
    [ids[i], ids[i + by]] = [ids[i + by], ids[i]];
    call(`/api/admin/projects/${slug}/screenshots`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }) });
  }

  return (
    <div className="card space-y-3 p-4">
      <div className="flex items-center justify-between">
        <span className="label">Screenshots</span>
        <span className="text-xs text-[var(--faint)]">
          {shots.length}/{MAX}
        </span>
      </div>
      <input
        ref={input}
        type="file"
        accept={IMAGE_ACCEPT}
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          e.target.value = "";
          upload(files);
        }}
      />
      {shots.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {shots.map((s, i) => (
            <div key={s.id} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--surface-2)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.url} alt={`Screenshot ${i + 1}`} className="size-full object-cover object-top" />
              <div className="absolute inset-0 flex items-end justify-between bg-black/40 p-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                <button type="button" onClick={() => move(i, -1)} disabled={busy || i === 0} aria-label="Move earlier" className="grid size-6 place-items-center rounded-full bg-white/90 text-black disabled:opacity-30">
                  <ChevronLeft size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => confirm("Remove this screenshot?") && call(`/api/admin/projects/${slug}/screenshots/${s.id}`, { method: "DELETE" })}
                  disabled={busy}
                  aria-label="Remove screenshot"
                  className="grid size-6 place-items-center rounded-full bg-white/90 text-black disabled:opacity-30"
                >
                  <X size={13} />
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={busy || i === shots.length - 1} aria-label="Move later" className="grid size-6 place-items-center rounded-full bg-white/90 text-black disabled:opacity-30">
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {shots.length < MAX && (
        <button
          type="button"
          onClick={() => input.current?.click()}
          disabled={busy}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--line)] px-3 text-sm text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-50"
        >
          {busy ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />} Add screenshots
        </button>
      )}
      {err && <p className="text-sm text-[var(--accent-text)]">{err}</p>}
      <p className="text-xs text-[var(--faint)]">They play as a slideshow on the project page. Saved as soon as you add them.</p>
    </div>
  );
}
