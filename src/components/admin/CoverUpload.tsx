"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";

export const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";
export const LOGO_ACCEPT = `${IMAGE_ACCEPT},image/svg+xml`;
const MAX_BYTES = 4 * 1024 * 1024;

type Kind = "image" | "logo";

/** Returns an error message, or null if the file is fine to upload. */
export function checkImage(file: File, kind: Kind = "image") {
  if (kind === "logo" && !LOGO_ACCEPT.split(",").includes(file.type)) return "Use an SVG, PNG, WebP or JPG image.";
  if (kind === "image" && !IMAGE_ACCEPT.split(",").includes(file.type)) return "Use a JPG, PNG or WebP image.";
  if (file.size > MAX_BYTES) return "Image must be under 4 MB.";
  return null;
}

/** Uploads a cover or logo for a saved project. Resolves to the new image URL, or throws with a message. */
export async function uploadImage(slug: string, file: File, kind: Kind = "image"): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch(`/api/admin/projects/${slug}/${kind}`, { method: "PUT", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(res.status === 401 ? "Signed out. Refresh and sign in again." : (data.error ?? "Upload failed."));
  return data.url;
}

/** Upload / replace / remove buttons for a saved project's cover image or logo. */
export function CoverUpload({
  slug,
  name,
  image,
  onChange,
  kind = "image",
}: {
  slug: string;
  name: string;
  image?: string;
  onChange: (url?: string) => void;
  kind?: Kind;
}) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function upload(file: File) {
    const bad = checkImage(file, kind);
    if (bad) return setErr(bad);
    setErr(null);
    setBusy(true);
    try {
      onChange(await uploadImage(slug, file, kind));
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm(kind === "logo" ? `Remove the logo for ${name}?` : `Remove the image for ${name}? The drawn mockup will show instead.`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/projects/${slug}/${kind}`, { method: "DELETE" });
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
        accept={kind === "logo" ? LOGO_ACCEPT : IMAGE_ACCEPT}
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
        title={image ? `Replace ${kind}` : `Upload ${kind}`}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--line)] px-3 text-sm text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-50"
      >
        {busy ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />} {image ? "Replace" : kind === "logo" ? "Logo" : "Image"}
      </button>
      {image && (
        <button
          type="button"
          onClick={remove}
          disabled={busy}
          title={`Remove ${kind}`}
          aria-label={`Remove ${kind}`}
          className="grid size-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-50"
        >
          <Trash2 size={15} />
        </button>
      )}
      {err && <p className="basis-full text-sm text-[var(--accent-text)]">{err}</p>}
    </>
  );
}
