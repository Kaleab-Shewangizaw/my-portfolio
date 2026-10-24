"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";

export const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";
export const LOGO_ACCEPT = `${IMAGE_ACCEPT},image/svg+xml`;
// You can pick up to 15 MB; anything over 4 MB is shrunk in the browser first,
// since Vercel rejects request bodies over about 4.5 MB.
const MAX_PICK_BYTES = 15 * 1024 * 1024;
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

type Kind = "image" | "logo";

/** Returns an error message, or null if the file is fine to upload. */
export function checkImage(file: File, kind: Kind = "image") {
  if (kind === "logo" && !LOGO_ACCEPT.split(",").includes(file.type)) return "Use an SVG, PNG, WebP or JPG image.";
  if (kind === "image" && !IMAGE_ACCEPT.split(",").includes(file.type)) return "Use a JPG, PNG or WebP image.";
  if (file.size > MAX_PICK_BYTES) return "Image must be under 15 MB.";
  return null;
}

/** Scales and re-encodes an image until it fits the upload limit. Small files and SVGs pass through untouched. */
export async function shrinkImage(file: File): Promise<File> {
  if (file.size <= MAX_UPLOAD_BYTES || file.type === "image/svg+xml") return file;
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  try {
    for (const side of [3200, 2560, 1920, 1280]) {
      const scale = Math.min(1, side / Math.max(bitmap.width, bitmap.height));
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      for (const quality of [0.9, 0.8, 0.7]) {
        let blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/webp", quality));
        // Older Safari can't encode WebP and hands back a PNG; JPEG is the next best.
        if (blob?.type !== "image/webp") blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", quality));
        if (blob && blob.size <= MAX_UPLOAD_BYTES) {
          const ext = blob.type === "image/webp" ? "webp" : "jpg";
          return new File([blob], file.name.replace(/\.\w+$/, "") + "." + ext, { type: blob.type });
        }
      }
    }
  } finally {
    bitmap.close();
  }
  throw new Error("Couldn't shrink this image enough. Try a smaller one.");
}

/** Uploads a cover or logo for a saved project. Resolves to the new image URL, or throws with a message. */
export async function uploadImage(slug: string, file: File, kind: Kind = "image"): Promise<string> {
  const body = new FormData();
  body.append("file", await shrinkImage(file));
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
