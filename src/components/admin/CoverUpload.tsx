"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";

export const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";
const MAX_BYTES = 4 * 1024 * 1024;

/** Returns an error message, or null if the file is fine to upload. */
export function checkImage(file: File) {
  if (!IMAGE_ACCEPT.split(",").includes(file.type)) return "Use a JPG, PNG or WebP image.";
  if (file.size > MAX_BYTES) return "Image must be under 4 MB.";
  return null;
}

/** Uploads a cover for a saved project. Resolves to the new image URL, or throws with a message. */
export async function uploadImage(slug: string, file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch(`/api/admin/projects/${slug}/image`, { method: "PUT", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(res.status === 401 ? "Signed out. Refresh and sign in again." : (data.error ?? "Upload failed."));
  return data.url;
}

/** Upload / replace / remove buttons for a saved project's cover image. */
export function CoverUpload({ slug, name, image, onChange }: { slug: string; name: string; image?: string; onChange: (url?: string) => void }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function upload(file: File) {
    const bad = checkImage(file);
    if (bad) return setErr(bad);
    setErr(null);
    setBusy(true);
    try {
      onChange(await uploadImage(slug, file));
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm(`Remove the image for ${name}? The drawn mockup will show instead.`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/projects/${slug}/image`, { method: "DELETE" });
    setBusy(false);
    if (res.status === 401) return router.refresh();
    if (res.ok) onChange(undefined);
    else setErr("Couldn't remove it.");
  }

  return (
    <>
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
      <button
        type="button"
        onClick={() => input.current?.click()}
        disabled={busy}
        title={image ? "Replace image" : "Upload image"}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--line)] px-3 text-sm text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-50"
      >
        {busy ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />} {image ? "Replace" : "Image"}
      </button>
      {image && (
        <button
          type="button"
          onClick={remove}
          disabled={busy}
          title="Remove image"
          aria-label="Remove image"
          className="grid size-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-50"
        >
          <Trash2 size={15} />
        </button>
      )}
      {err && <p className="basis-full text-sm text-[var(--accent-text)]">{err}</p>}
    </>
  );
}
