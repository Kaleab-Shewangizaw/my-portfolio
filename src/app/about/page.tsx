import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { site, stack, timeline } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { Builds } from "@/components/Builds";
import { ToolChip } from "@/components/ToolChip";
import { OrgLogo } from "@/components/OrgLogo";
import { Terminal } from "@/components/Terminal";
import { Contributions } from "@/components/Contributions";
import { getGitHub } from "@/lib/github";
import { getProjects } from "@/lib/projects";
import { DEFAULT_PORTRAIT, getUploadedPortrait } from "@/lib/portrait";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, a software engineer in ${site.city}.`,
};

const facts = [
  ["Based in", site.location],
  ["Coding since", String(site.startedCoding)],
  ["Currently", "CTO at Pazimo"],
];

export const revalidate = 3600;

export default async function AboutPage() {
  const [projects, gh, portrait] = await Promise.all([getProjects(), getGitHub(), getUploadedPortrait()]);
  return (
    <section className="shell pt-24 lg:pt-28">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[340px_1fr]">
        <Reveal className="card overflow-hidden p-2">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--surface-2)]">
            <Image
              src={portrait ?? DEFAULT_PORTRAIT}
              unoptimized={!!portrait}
              alt={`Portrait of ${site.name}`}
              fill
              sizes="340px"
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
          <dl className="space-y-3 p-4 text-sm">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-[var(--muted)]">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="card p-6 sm:p-10">
          <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            I build things that work, then make them better.
          </h1>
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-[var(--muted)]">
            <p>
              I&apos;m Kaleab, a self-taught software engineer from Addis Ababa, writing code since {site.startedCoding}. Today I&apos;m CTO and solo
              engineer at Pazimo, responsible for its ticketing website and both phone apps, from first design to launch.
            </p>
            <p>
              Alongside that, I&apos;m studying engineering at Addis Ababa University, and care most about the small details that make an
              app feel easy to use.
            </p>
          </div>
          <a href={site.cv} target="_blank" rel="noopener" className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-[var(--fg)] px-5 text-sm font-medium text-[var(--bg)]">
            <Download size={15} /> Download résumé
          </a>
        </Reveal>
      </div>

      <Reveal className="card mt-3 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">Experience &amp; education</h2>
          <ol className="mt-5 space-y-5 border-l border-[var(--line)] pl-5">
            {timeline.map((t, i) => (
              <li key={t.title + t.org} className="relative">
                <span className={"absolute -left-[25px] top-1.5 size-2.5 rounded-full border-2 border-[var(--surface)] " + (i === 0 ? "bg-[var(--fg)]" : "bg-[var(--faint)]")} />
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="mono text-xs text-[var(--muted)]">{t.period}</p>
                    <p className="mt-0.5 font-medium">
                      {t.title} <span className="text-[var(--muted)]">· {t.org}</span>
                    </p>
                  </div>
                  <OrgLogo org={t.org} logo={t.logo} />
                </div>
                <p className="mt-0.5 text-sm text-[var(--muted)]">{t.note}</p>
                {t.builds && <Builds items={t.builds} />}
              </li>
            ))}
          </ol>
        </Reveal>

      {gh && (
        <Reveal className="card mt-3 min-w-0 p-6 sm:p-8">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {gh.total.toLocaleString()} contributions <span className="text-[var(--muted)]">in the last year</span>
            </h2>
            <a href={`https://github.com/${site.github}`} target="_blank" rel="noopener noreferrer" className="mono text-xs text-[var(--muted)] hover:text-[var(--fg)]">
              github.com/{site.github} ↗
            </a>
          </div>
          <Contributions days={gh.contributions} />
        </Reveal>
      )}

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <Reveal>
          <Terminal projects={projects.map(({ slug, name, kind }) => ({ slug, name, kind }))} />
        </Reveal>
        <Reveal delay={0.08} className="card p-6">
          <p className="label">What I work with</p>
          <dl className="mt-5 divide-y divide-[var(--line)]">
            {stack.map((s) => (
              <div key={s.group} className="grid grid-cols-1 gap-2 py-3 first:pt-0 sm:grid-cols-[100px_1fr]">
                <dt className="label pt-1">{s.group}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <ToolChip key={it} name={it} />
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
