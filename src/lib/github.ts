import { site } from "@/content/site";

export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type GitHubStats = { contributions: Day[]; total: number; repos: number; followers: number } | null;

// Refreshed daily at most. If either API is down, the section quietly hides.
export async function getGitHub(): Promise<GitHubStats> {
  try {
    const [c, u] = await Promise.all([
      fetch(`https://github-contributions-api.jogruber.de/v4/${site.github}?y=last`, { next: { revalidate: 86400 } }),
      fetch(`https://api.github.com/users/${site.github}`, { next: { revalidate: 86400 }, headers: { Accept: "application/vnd.github+json" } }),
    ]);
    if (!c.ok) return null;
    const cj = await c.json();
    const uj = u.ok ? await u.json() : {};
    return {
      contributions: cj.contributions as Day[],
      total: cj.total?.lastYear ?? 0,
      repos: uj.public_repos ?? 0,
      followers: uj.followers ?? 0,
    };
  } catch {
    return null;
  }
}
