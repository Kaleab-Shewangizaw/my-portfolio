"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Github, ImagePlus, Loader2, Plus, X } from "lucide-react";
import type { Project } from "@/content/site";
import { PLATFORMS, parseProject, slugify } from "@/lib/projectSchema";
import { ProjectCard } from "../ProjectCard";
import { CoverUpload, IMAGE_ACCEPT, checkImage, uploadImage } from "./CoverUpload";
import { cn } from "@/lib/utils";

type Draft = {
  name: string;
  slug: string;
  year: string;
  platform: Project["platform"];
  kind: string;
  role: string;
  summary: string;
  stack: string;
  live: string;
  liveLabel: string;
  code: string;
  highlights: string;
  story: { heading: string; body: string }[];
  featured: boolean;
};

const DEFAULT_STORY = [
  { heading: "Why", body: "" },
  { heading: "How it works", body: "" },
  { heading: "What I learned", body: "" },
];

function toDraft(p?: Project): Draft {
  return {
    name: p?.name ?? "",
    slug: p?.slug ?? "",
    year: p?.year ?? String(new Date().getFullYear()),
    platform: p?.platform ?? "tool",
    kind: p?.kind ?? "",
    role: p?.role ?? "Solo",
    summary: p?.summary ?? "",
    stack: p?.stack.join(", ") ?? "",
    live: p?.links.live ?? "",
    liveLabel: p?.links.liveLabel ?? "",
    code: p?.links.code ?? "",
    highlights: p?.highlights.join("\n") ?? "",
    story: p?.story.length ? p.story : DEFAULT_STORY,
    featured: !!p?.featured,
  };
}

function fromDraft(d: Draft) {
  return {
    name: d.name,
    slug: d.slug,
    year: d.year,
    platform: d.platform,
    kind: d.kind,
    role: d.role,
    summary: d.summary,
    stack: d.stack.split(","),
    links: { live: d.live, liveLabel: d.liveLabel, code: d.code },
    highlights: d.highlights.split("\n"),
    story: d.story,
    featured: d.featured,
  };
}

const input =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3.5 py-2.5 text-[15px] outline-none placeholder:text-[var(--faint)] focus:border-[var(--accent)] focus-visible:outline-none";

function Field({ label, hint, className, children }: { label: string; hint?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("block", className)}>
      <span className="label">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-xs text-[var(--faint)]">{hint}</span>}
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card space-y-4 p-5 sm:p-6">
      <h2 className="font-semibold tracking-tight">{title}</h2>
      {children}
    </div>
  );
}

export function ProjectEditor({ project, image: initialImage, builtIn }: { project?: Project; image?: string; builtIn?: boolean }) {
  const router = useRouter();
  const isNew = !project;
  const [d, setD] = useState<Draft>(() => toDraft(project));
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [image, setImage] = useState(initialImage);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [repo, setRepo] = useState("");
  const [importing, setImporting] = useState(false);
  const [dirty, setDirty] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    setDirty(true);
    setD((prev) => ({ ...prev, [k]: v, ...(k === "name" && !slugTouched ? { slug: slugify(v as string) } : {}) }));
  };

  // A local preview of an image picked before the project exists.
  const pendingUrl = useMemo(() => (pendingFile ? URL.createObjectURL(pendingFile) : undefined), [pendingFile]);
  useEffect(() => () => void (pendingUrl && URL.revokeObjectURL(pendingUrl)), [pendingUrl]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const parsed = parseProject(fromDraft(d));
  // While the form is incomplete, preview what's there with placeholders.
  const preview: Project =
    typeof parsed !== "string"
      ? parsed
      : {
          slug: d.slug || "preview",
          name: d.name || "Untitled project",
          year: d.year,
          platform: d.platform,
          kind: d.kind || PLATFORMS.find((p) => p.id === d.platform)!.label,
          role: d.role,
          summary: d.summary || "Your summary shows here.",
          stack: d.stack.split(",").map((s) => s.trim()).filter(Boolean),
          links: {},
          highlights: d.highlights.split("\n").map((s) => s.trim()).filter(Boolean),
          story: [],
        };

  async function importRepo() {
    if (!repo.trim()) return;
    setImporting(true);
    setErr(null);
    const res = await fetch(`/api/admin/github?repo=${encodeURIComponent(repo)}`).catch(() => null);
    const data = await res?.json().catch(() => ({}));
    setImporting(false);
    if (!res?.ok) return setErr(data?.error ?? "Import failed.");
    setDirty(true);
    setD((prev) => ({
      ...prev,
      name: data.name || prev.name,
      slug: slugTouched ? prev.slug : slugify(data.name || prev.name),
      summary: data.summary || prev.summary,
      year: data.year || prev.year,
      stack: data.stack?.length ? data.stack.join(", ") : prev.stack,
      code: data.links?.code || prev.code,
      live: data.links?.live || prev.live,
    }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (typeof parsed === "string") return setErr(parsed);
    setSaving(true);
    setErr(null);
    const res = await fetch(isNew ? "/api/admin/projects" : `/api/admin/projects/${project.slug}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fromDraft(d)),
    }).catch(() => null);
    const data = await res?.json().catch(() => ({}));
    if (res?.status === 401) {
      setSaving(false);
      return setErr("You were signed out. Open the admin in another tab, sign in, then save again.");
    }
    if (!res?.ok) {
      setSaving(false);
      return setErr(data?.error ?? "Couldn't save. Is the database reachable?");
    }
    if (isNew && pendingFile) {
      try {
        await uploadImage(data.slug, pendingFile);
      } catch (e) {
        // The project is saved; send them to it so they can retry the image.
        setSaving(false);
        setDirty(false);
        alert(`Project saved, but the image didn't upload: ${(e as Error).message}`);
        return router.push(`/admin/projects/${data.slug}`);
      }
    }
    setDirty(false);
    router.push("/admin/projects");
    router.refresh();
  }

  const setStory = (i: number, patch: Partial<Draft["story"][number]>) => set("story", d.story.map((s, n) => (n === i ? { ...s, ...patch } : s)));

  return (
    <section className="shell pt-24 lg:pt-28">
      <Link href="/admin/projects" className="label inline-flex items-center gap-1.5 hover:text-[var(--fg)]">
        <ArrowLeft size={13} /> All projects
      </Link>
      <h1 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1] tracking-[-0.04em]">{isNew ? "New project" : `Edit ${project.name}`}</h1>
      {builtIn && <p className="mt-3 text-sm text-[var(--muted)]">This one is built in. Saving stores your version in the database; &ldquo;Reset&rdquo; on the list brings back the original.</p>}

      <form onSubmit={save} className="mt-6 grid items-start gap-3 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-3">
          {isNew && (
            <div className="card flex flex-wrap items-end gap-2 p-5 sm:p-6">
              <Field label="Start from a GitHub repo" hint="Fills in the name, summary, year, stack and links. You can change everything after." className="min-w-[220px] flex-1">
                <input
                  className={input}
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      importRepo();
                    }
                  }}
                  placeholder="repo-name, owner/repo or a github.com link"
                />
              </Field>
              <button type="button" onClick={importRepo} disabled={importing || !repo.trim()} className="mb-5 inline-flex h-11 items-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm font-medium hover:bg-[var(--surface-2)] disabled:opacity-50">
                {importing ? <Loader2 size={15} className="animate-spin" /> : <Github size={15} />} Import
              </button>
            </div>
          )}

          <Section title="Basics">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <input className={input} value={d.name} onChange={(e) => set("name", e.target.value)} placeholder="Chop" required />
              </Field>
              <Field label="Slug" hint={isNew ? `kal-x.vercel.app/work/${d.slug || "…"}` : "Fixed once created, so links don't break."}>
                <input
                  className={cn(input, "mono", !isNew && "opacity-60")}
                  value={d.slug}
                  disabled={!isNew}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", slugify(e.target.value));
                  }}
                  placeholder="chop"
                />
              </Field>
              <Field label="Platform" hint="Decides the filter on /work and the shape of the drawn mockup.">
                <select className={input} value={d.platform} onChange={(e) => set("platform", e.target.value as Project["platform"])}>
                  {PLATFORMS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Kind" hint="Short label under the name.">
                <input className={input} value={d.kind} onChange={(e) => set("kind", e.target.value)} placeholder="AI content tool" />
              </Field>
              <Field label="Role">
                <input className={input} value={d.role} onChange={(e) => set("role", e.target.value)} placeholder="Solo" />
              </Field>
              <Field label="Year">
                <input className={input} value={d.year} onChange={(e) => set("year", e.target.value)} placeholder="2026" />
              </Field>
            </div>
            <Field label="Summary" hint={`${d.summary.length}/600 · the card shows about three lines.`}>
              <textarea className={cn(input, "min-h-[96px] resize-y")} value={d.summary} onChange={(e) => set("summary", e.target.value)} maxLength={600} required />
            </Field>
          </Section>

          <Section title="Stack and links">
            <Field label="Stack" hint="Comma separated. The card shows the first four.">
              <input className={input} value={d.stack} onChange={(e) => set("stack", e.target.value)} placeholder="Next.js, TypeScript, MongoDB" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
              <Field label="Live link">
                <input className={input} type="url" value={d.live} onChange={(e) => set("live", e.target.value)} placeholder="https://…" />
              </Field>
              <Field label="Button text">
                <input className={input} value={d.liveLabel} onChange={(e) => set("liveLabel", e.target.value)} placeholder="Visit live" disabled={!d.live} />
              </Field>
            </div>
            <Field label="Code link">
              <input className={input} type="url" value={d.code} onChange={(e) => set("code", e.target.value)} placeholder="https://github.com/…" />
            </Field>
          </Section>

          <Section title="Case study">
            <Field label="Highlights" hint="One per line, up to eight.">
              <textarea className={cn(input, "min-h-[110px] resize-y")} value={d.highlights} onChange={(e) => set("highlights", e.target.value)} placeholder={"Reads PDFs and images, not just text\nOne input, five outputs"} />
            </Field>
            <div className="space-y-3">
              <span className="label">Story sections</span>
              {d.story.map((s, i) => (
                <div key={i} className="space-y-2 rounded-xl border border-[var(--line)] p-3">
                  <div className="flex items-center gap-2">
                    <span className="mono text-sm text-[var(--faint)]">0{i + 1}</span>
                    <input className={cn(input, "py-2")} value={s.heading} onChange={(e) => setStory(i, { heading: e.target.value })} placeholder="Heading" />
                    <button type="button" onClick={() => set("story", d.story.filter((_, n) => n !== i))} disabled={d.story.length === 1} className="grid size-9 shrink-0 place-items-center rounded-full text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-30" aria-label="Remove section">
                      <X size={15} />
                    </button>
                  </div>
                  <textarea className={cn(input, "min-h-[88px] resize-y")} value={s.body} onChange={(e) => setStory(i, { body: e.target.value })} placeholder="A few sentences. Sections left empty are skipped." />
                </div>
              ))}
              {d.story.length < 6 && (
                <button type="button" onClick={() => set("story", [...d.story, { heading: "", body: "" }])} className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--fg)]">
                  <Plus size={14} /> Add section
                </button>
              )}
            </div>
          </Section>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-24">
          <div>
            <p className="label mb-2">Preview</p>
            <div className="pointer-events-none" aria-hidden>
              <ProjectCard project={preview} image={pendingUrl ?? image} />
            </div>
          </div>
          <div className="card flex flex-wrap items-center gap-2 p-4">
            <span className="label basis-full">Cover image</span>
            {isNew ? (
              <>
                <input
                  ref={fileInput}
                  type="file"
                  accept={IMAGE_ACCEPT}
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    e.target.value = "";
                    if (!f) return;
                    const bad = checkImage(f);
                    if (bad) return setErr(bad);
                    setPendingFile(f);
                  }}
                />
                <button type="button" onClick={() => fileInput.current?.click()} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--line)] px-3 text-sm text-[var(--muted)] hover:text-[var(--fg)]">
                  <ImagePlus size={15} /> {pendingFile ? "Change" : "Choose image"}
                </button>
                {pendingFile && (
                  <button type="button" onClick={() => setPendingFile(null)} className="text-sm text-[var(--muted)] hover:text-[var(--fg)]">
                    Use drawn mockup
                  </button>
                )}
              </>
            ) : (
              <CoverUpload slug={project.slug} name={project.name} image={image} onChange={setImage} />
            )}
            <span className="basis-full text-xs text-[var(--faint)]">Optional. JPG, PNG or WebP up to 4 MB. Without one, a mockup is drawn from the project.</span>
          </div>
          {err && <p className="card p-4 text-sm text-[var(--accent-text)]">{err}</p>}
          <button disabled={saving} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--fg)] text-sm font-medium text-[var(--bg)] disabled:opacity-50">
            {saving && <Loader2 size={15} className="animate-spin" />} {isNew ? "Publish project" : "Save changes"}
          </button>
          {typeof parsed === "string" && <p className="text-center text-xs text-[var(--faint)]">{parsed}</p>}
        </aside>
      </form>
    </section>
  );
}
