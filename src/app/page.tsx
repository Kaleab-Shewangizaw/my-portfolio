import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { principles, projects, site, toolkit } from "@/content/site";
import { HeroLens } from "@/components/HeroLens";
import { WorkStack } from "@/components/WorkStack";
import { Reveal } from "@/components/Reveal";
import { LiquidGlass } from "@/components/LiquidGlass";

function Headline() {
  const { lead, emphasis, tail } = site.headline;
  return (
    <h1 className="py-4 text-[clamp(3rem,10vw,9.5rem)] font-medium leading-[0.98] tracking-[-0.05em] sm:leading-[0.9]">
      {lead}
      <br />
      <span className="font-serif italic tracking-[-0.02em]">{emphasis}</span>
      <br />
      {tail}
    </h1>
  );
}

export default function Home() {
  const stackWords = toolkit.flatMap((t) => t.items);

  return (
    <>
      {/* Hero */}
      <section className="shell flex min-h-[100svh] flex-col justify-center pb-24 pt-32">
        <p className="label mb-8">
          {site.name} — {site.role}
        </p>
        <HeroLens>
          <Headline />
        </HeroLens>
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-lg text-lg leading-relaxed text-[var(--muted)]">{site.intro}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/work" className="group inline-flex h-12 items-center gap-2 rounded-full bg-[var(--fg)] px-6 text-sm font-medium text-[var(--bg)]">
              See the work
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a href={site.cv} target="_blank" rel="noopener" className="glass inline-flex h-12 items-center rounded-full px-6 text-sm font-medium">
              Résumé
            </a>
          </div>
        </div>
        <a href="#work" className="label mt-20 flex items-center gap-2 self-start hover:text-[var(--fg)]">
          <ArrowDown size={13} className="animate-bounce" /> Scroll
        </a>
      </section>

      {/* Selected work */}
      <section id="work" className="shell scroll-mt-10">
        <Reveal className="mb-14 flex items-end justify-between gap-6">
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-medium leading-none tracking-[-0.04em]">
            Selected <span className="font-serif italic">work</span>
          </h2>
          <Link href="/work" className="label link-underline hover:text-[var(--fg)]">
            Full index ({projects.length})
          </Link>
        </Reveal>
        <WorkStack items={projects.slice(0, 4)} />
      </section>

      {/* Principles */}
      <section className="shell mt-24">
        <Reveal className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <p className="label">How I work</p>
          <h2 className="text-[clamp(1.75rem,3.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em]">
            Good software is a stack of small decisions made with care.{" "}
            <span className="font-serif italic text-[var(--muted)]">These are the ones I keep making.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <LiquidGlass radius={26} className="flex h-full flex-col p-7">
                <span className="font-serif text-5xl italic text-[var(--faint)]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-14 text-lg font-medium tracking-tight">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">{p.body}</p>
              </LiquidGlass>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Toolkit marquee */}
      <section className="mt-32 overflow-hidden border-y hairline py-8" aria-label="Toolkit">
        <div className="marquee">
          {[0, 1].map((k) => (
            <ul key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
              {stackWords.map((w, i) => (
                <li key={w} className="flex items-center whitespace-nowrap px-6 text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.03em]">
                  <span className={i % 2 ? "font-serif italic text-[var(--muted)]" : "font-medium"}>{w}</span>
                  <span className="ml-12 size-1.5 rounded-full bg-[var(--faint)]" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>
    </>
  );
}
