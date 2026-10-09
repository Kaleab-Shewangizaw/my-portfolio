"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import type { Project } from "@/content/site";
import { ProjectCover } from "../ProjectCover";

const MAX_BYTES = 4 * 1024 * 1024;

function Row({ project, image: initial }: { project: Project; image?: string }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function upload(file: File) {
    setErr(null);
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return setErr("Use a JPG, PNG or WebP image.");
    if (file.size > MAX_BYTES) return setErr("Image must be under 4 MB.");
    setBusy(true);
    const body = new FormData();
    body.append("file", file);
    const res = await fetch(`/api/admin/projects/${project.slug}/image`, { method: "PUT", body });
    setBusy(false);
    if (res.status === 401) return router.refresh();
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return setErr(data.error ?? "Upload failed.");
    setImage(data.url);
  }

  async function remove() {
    if (!confirm(`Remove the image for ${project.name}? The drawn mockup will show instead.`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/projects/${project.slug}/image`, { method: "DELETE" });
    setBusy(false);
    if (res.status === 401) return router.refresh();
    if (res.ok) setImage(undefined);
    else setErr("Couldn't remove it.");
  }

  return (
    <li className="card flex flex-col p-2">
      <ProjectCover project={project} image={image} className="h-[220px]" />
      <div className="flex flex-1 flex-col gap-3 p-3">
        <div>
          <p className="font-semibold tracking-tight">{project.name}</p>
          <p className="label mt-0.5">{image ? "Custom image" : "Drawn mockup"}</p>
        </div>
        {err && <p className="text-sm text-[var(--muted)]">{err}</p>}
        <div className="mt-auto flex gap-2">
          <input
            ref={input}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (f) upload(f);
            }}
          />
          <button
            onClick={() => input.current?.click()}
            disabled={busy}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[var(--fg)] px-3.5 text-sm font-medium text-[var(--bg)] disabled:opacity-50"
          >
            {busy ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />} {image ? "Replace" : "Upload image"}
          </button>
          {image && (
            <button
              onClick={remove}
              disabled={busy}
              className="grid size-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-50"
              aria-label="Remove image"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export function ProjectImages({ projects, images }: { projects: Project[]; images: Record<string, string> }) {
  return (
    <section className="shell pt-24 lg:pt-28">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">~/admin/projects</p>
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1] tracking-[-0.04em]">Project images</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">JPG, PNG or WebP, up to 4 MB. Projects without an image show the drawn mockup.</p>
        </div>
        <Link href="/admin/testimonials" className="inline-flex h-10 items-center rounded-full border border-[var(--line)] px-4 text-sm text-[var(--muted)] hover:text-[var(--fg)]">
          Testimonials
        </Link>
      </div>
      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Row key={p.slug} project={p} image={images[p.slug]} />
        ))}
      </ul>
    </section>
  );
}
