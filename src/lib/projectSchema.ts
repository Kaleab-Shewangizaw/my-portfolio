import type { Project } from "@/content/site";

// Shared by the admin form and the API, so both agree on what a valid project is.

export const PLATFORMS: { id: Project["platform"]; label: string }[] = [
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "tool", label: "Side project / tool" },
];

// Paths under /api/admin/projects and /work that a project slug must not shadow.
const RESERVED = new Set(["new", "reorder"]);

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const list = (v: unknown, max: number, each: number) =>
  (Array.isArray(v) ? v : [])
    .map((x) => str(x, each))
    .filter(Boolean)
    .slice(0, max);

function url(v: unknown) {
  const s = str(v, 500);
  if (!s) return undefined;
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null;
  } catch {
    return null;
  }
}

/** Cleans untrusted input into a Project, or returns an error message. */
export function parseProject(input: unknown): Project | string {
  const o = (input ?? {}) as Record<string, unknown>;
  const links = (o.links ?? {}) as Record<string, unknown>;

  const name = str(o.name, 80);
  const slug = slugify(str(o.slug, 60) || name);
  const platform = PLATFORMS.find((p) => p.id === o.platform)?.id;
  const summary = str(o.summary, 600);
  const live = url(links.live);
  const code = url(links.code);
  const story = (Array.isArray(o.story) ? o.story : [])
    .map((s) => ({ heading: str((s as Record<string, unknown>)?.heading, 80), body: str((s as Record<string, unknown>)?.body, 1500) }))
    .filter((s) => s.heading && s.body)
    .slice(0, 6);

  if (!name) return "Give the project a name.";
  if (!slug) return "The slug needs at least one letter or number.";
  if (RESERVED.has(slug)) return `"${slug}" is reserved. Pick another slug.`;
  if (!platform) return "Pick a platform.";
  if (!summary) return "Write a short summary.";
  if (live === null) return "The live link must be a full http(s) URL.";
  if (code === null) return "The code link must be a full http(s) URL.";
  if (story.length === 0) return "Add at least one story section (the case study needs it).";

  return {
    slug,
    name,
    year: str(o.year, 20) || String(new Date().getFullYear()),
    platform,
    kind: str(o.kind, 60) || PLATFORMS.find((p) => p.id === platform)!.label,
    role: str(o.role, 80) || "Solo",
    summary,
    stack: list(o.stack, 16, 40),
    links: {
      ...(live ? { live } : {}),
      ...(live && str(links.liveLabel, 40) ? { liveLabel: str(links.liveLabel, 40) } : {}),
      ...(code ? { code } : {}),
    },
    highlights: list(o.highlights, 8, 200),
    story,
    ...(o.featured === true ? { featured: true } : {}),
  };
}
