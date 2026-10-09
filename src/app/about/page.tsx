import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { site, stack, timeline } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { Builds } from "@/components/Builds";
import { ToolChip } from "@/components/ToolChip";
import { OrgLogo } from "@/components/OrgLogo";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, a software engineer in ${site.city}.`,
};

const facts = [
  ["Based in", site.location],
  ["Writing code since", String(site.startedCoding)],
  ["Currently", "CTO at Pazimo"],
  ["Focus", "Full stack, mobile & infra"],
];

export default function AboutPage() {
  return (
    <section className="shell pt-24 lg:pt-28">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[340px_1fr]">
        <Reveal className="card overflow-hidden p-2">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--surface-2)]">
            <Image
              src="/me.jpg"
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
          <p className="label">~/about</p>
          <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            I like building things that work, and then making them better.
          </h1>
          <div className="mt-6 max-w-2xl space-y-4 text-[17px] leading-relaxed text-[var(--muted)]">
            <p>
              I&apos;m Kaleab, a software engineer from Addis Ababa. I started coding in {site.startedCoding} with a Scrimba course and a lot of
              late nights, and I haven&apos;t stopped since. Today I lead engineering at Pazimo, where we run a ticketing platform
              with a web app, two mobile apps and the API behind all of them.
            </p>
            <p>
              Most of my work is full stack. I&apos;m comfortable designing a MongoDB schema in the morning, fixing a React Native
              animation after lunch, and shipping a deploy at night. I care about the parts users never see: clear errors, fast
              loading and code the next person can read.
            </p>
            <p>
              I&apos;m also studying engineering at AAiT, I went through A2SV&apos;s problem-solving track, and I taught web development at
              GDG. Teaching taught me that if I can&apos;t explain something simply, I don&apos;t really understand it yet.
            </p>
            <p className="text-[var(--fg)]">
              Outside of Pazimo I like going one layer deeper. Right now that means building my own NGINX in Rust, to understand
              what really happens between a request coming in and a response going out.
            </p>
          </div>
          <a href={site.cv} target="_blank" rel="noopener" className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-[var(--fg)] px-5 text-sm font-medium text-[var(--bg)]">
            <Download size={15} /> Download résumé
          </a>
        </Reveal>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr]">
        <Reveal className="card p-6">
          <p className="label">Experience & education</p>
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
