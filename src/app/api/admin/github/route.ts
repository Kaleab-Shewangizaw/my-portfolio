import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { site } from "@/content/site";

const headers = {
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

// "Kaleab-Shewangizaw/chop", "chop" or a full github.com URL → owner/name.
function repoPath(input: string) {
  const s = input.trim().replace(/^https?:\/\/(www\.)?github\.com\//, "").replace(/\.git$/, "").replace(/\/+$/, "");
  const parts = s.split("/").filter(Boolean);
  if (parts.length === 1) return `${site.github}/${parts[0]}`;
  if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
  return null;
}

const title = (s: string) => s.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/** Draft project fields from a GitHub repo, to pre-fill the "new project" form. */
export async function GET(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const path = repoPath(new URL(req.url).searchParams.get("repo") ?? "");
  if (!path || !/^[\w.-]+\/[\w.-]+$/.test(path)) return NextResponse.json({ error: "Use owner/repo or a github.com link." }, { status: 400 });

  const [repo, langs] = await Promise.all([
    fetch(`https://api.github.com/repos/${path}`, { headers, cache: "no-store" }),
    fetch(`https://api.github.com/repos/${path}/languages`, { headers, cache: "no-store" }),
  ]);
  if (repo.status === 404) return NextResponse.json({ error: `Couldn't find ${path} (private repos need GITHUB_TOKEN).` }, { status: 404 });
  if (!repo.ok) return NextResponse.json({ error: `GitHub said ${repo.status}. Try again in a bit.` }, { status: 502 });

  const r = await repo.json();
  const languages = langs.ok ? Object.keys(await langs.json()) : [];
  const topics: string[] = (r.topics ?? []).map(title);
  const stack = [...new Set([...languages.slice(0, 4), ...topics])].slice(0, 8);

  return NextResponse.json({
    name: title(r.name),
    summary: r.description ?? "",
    year: String(new Date(r.created_at).getFullYear()),
    stack,
    links: { code: r.html_url, live: r.homepage || "" },
  });
}
