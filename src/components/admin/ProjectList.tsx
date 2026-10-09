"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, MessageSquareQuote, Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import type { ManagedProject } from "@/lib/projects";
import { ProjectCover } from "../ProjectCover";
import { CoverUpload } from "./CoverUpload";
import { cn } from "@/lib/utils";

const iconBtn =
  "grid size-9 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)] disabled:pointer-events-none disabled:opacity-30";

function Badge({ children, tone }: { children: React.ReactNode; tone?: "accent" }) {
  return (
    <span className={cn("mono rounded-md px-1.5 py-0.5 text-[11px]", tone === "accent" ? "bg-[var(--accent)] text-[var(--on-accent)]" : "bg-[var(--surface-2)] text-[var(--muted)]")}>
      {children}
    </span>
  );
}

export function ProjectList({ projects, images: initialImages }: { projects: ManagedProject[]; images: Record<string, string> }) {
  const router = useRouter();
  const [items, setItems] = useState(projects);
  const [images, setImages] = useState(initialImages);
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function call(slug: string, url: string, init: RequestInit, rollback?: () => void) {
    setBusy(slug);
    setErr(null);
    const res = await fetch(url, { ...init, headers: { "Content-Type": "application/json" } }).catch(() => null);
    setBusy(null);
    if (res?.status === 401) return router.refresh();
    if (!res?.ok) {
      rollback?.();
      const data = await res?.json().catch(() => ({}));
      setErr(data?.error ?? "Something went wrong. Is the database reachable?");
      return false;
    }
    router.refresh();
    return true;
  }

  function move(i: number, by: -1 | 1) {
    const before = items;
    const next = [...items];
    [next[i], next[i + by]] = [next[i + by], next[i]];
    setItems(next);
    call(next[i + by].slug, "/api/admin/projects", { method: "PATCH", body: JSON.stringify({ order: next.map((p) => p.slug) }) }, () => setItems(before));
  }

  function toggleHidden(p: ManagedProject) {
    const before = items;
    setItems(items.map((x) => (x.slug === p.slug ? { ...x, hidden: !p.hidden } : x)));
    call(p.slug, `/api/admin/projects/${p.slug}`, { method: "PATCH", body: JSON.stringify({ hidden: !p.hidden }) }, () => setItems(before));
  }

  async function remove(p: ManagedProject) {
    const msg = p.builtIn
      ? `Reset ${p.name} to the version in content/site.ts? Your edits will be lost.`
      : `Delete ${p.name} and its image? This can't be undone.`;
    if (!confirm(msg)) return;
    if (await call(p.slug, `/api/admin/projects/${p.slug}`, { method: "DELETE" })) {
      if (!p.builtIn) setItems((all) => all.filter((x) => x.slug !== p.slug));
    }
  }

  const live = items.filter((p) => !p.hidden).length;

  return (
    <section className="shell pt-24 lg:pt-28">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">~/admin/projects</p>
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1] tracking-[-0.04em]">Projects</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">
            {live} live{items.length > live ? `, ${items.length - live} hidden` : ""}. The order here is the order on the site.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/testimonials" className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm text-[var(--muted)] hover:text-[var(--fg)]">
            <MessageSquareQuote size={15} /> Testimonials
          </Link>
          <Link href="/admin/projects/new" className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--fg)] px-4 text-sm font-medium text-[var(--bg)]">
            <Plus size={15} /> New project
          </Link>
        </div>
      </div>

      {err && <div className="card mb-3 p-4 text-sm text-[var(--accent-text)]">{err}</div>}

      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <li key={p.slug} className={cn("card flex flex-col p-2 transition-opacity", p.hidden && "opacity-55", busy === p.slug && "animate-pulse")}>
            <ProjectCover project={p} image={images[p.slug]} className="h-[200px]" />
            <div className="flex flex-1 flex-col gap-3 p-3">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/admin/projects/${p.slug}`} className="font-semibold tracking-tight hover:underline">
                    {p.name}
                  </Link>
                  <span className="mono text-xs text-[var(--faint)]">#{i + 1}</span>
                </div>
                <p className="label mt-0.5">
                  {p.kind} · {p.year}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.hidden && <Badge tone="accent">hidden</Badge>}
                  <Badge>{p.builtIn ? (p.edited ? "built-in · edited" : "built-in") : "added here"}</Badge>
                  <Badge>{images[p.slug] ? "custom image" : "drawn mockup"}</Badge>
                </div>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-2">
                <Link href={`/admin/projects/${p.slug}`} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[var(--fg)] px-3.5 text-sm font-medium text-[var(--bg)]">
                  <Pencil size={14} /> Edit
                </Link>
                <CoverUpload slug={p.slug} name={p.name} image={images[p.slug]} onChange={(url) =>
                    setImages((all) => {
                      const next = { ...all };
                      if (url) next[p.slug] = url;
                      else delete next[p.slug];
                      return next;
                    })
                  } />
                <span className="ml-auto flex gap-1.5">
                  <button onClick={() => move(i, -1)} disabled={i === 0 || !!busy} className={iconBtn} title="Move earlier" aria-label="Move earlier">
                    <ArrowUp size={15} />
                  </button>
                  <button onClick={() => move(i, 1)} disabled={i === items.length - 1 || !!busy} className={iconBtn} title="Move later" aria-label="Move later">
                    <ArrowDown size={15} />
                  </button>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-[var(--line)] pt-3 text-sm">
                <button onClick={() => toggleHidden(p)} disabled={!!busy} className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-50">
                  {p.hidden ? <Eye size={14} /> : <EyeOff size={14} />} {p.hidden ? "Show on site" : "Hide"}
                </button>
                <a href={`/work/${p.slug}`} target="_blank" rel="noopener" className={cn("text-[var(--muted)] hover:text-[var(--fg)]", p.hidden && "pointer-events-none opacity-40")}>
                  View ↗
                </a>
                {(!p.builtIn || p.edited) && (
                  <button onClick={() => remove(p)} disabled={!!busy} className="ml-auto inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--accent-text)] disabled:opacity-50">
                    {p.builtIn ? <RotateCcw size={14} /> : <Trash2 size={14} />} {p.builtIn ? "Reset" : "Delete"}
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
