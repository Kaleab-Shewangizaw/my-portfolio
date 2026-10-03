import type { Metadata } from "next";
import { principles, site, timeline, toolkit } from "@/content/site";
import { LiquidGlass } from "@/components/LiquidGlass";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — how I think about building software.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="shell pt-40">
        <Reveal>
          <p className="label">About</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.5rem,6.5vw,6rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            Engineer by trade, <span className="font-serif italic">designer by temperament.</span>
          </h1>
        </Reveal>
        <div className="mt-20 grid gap-12 md:grid-cols-[1fr_2fr]">
          <Reveal>
            <LiquidGlass radius={28} className="p-6">
              <dl className="space-y-5 text-[15px]">
                <div><dt className="label">Based in</dt><dd className="mt-1.5">{site.location}</dd></div>
                <div><dt className="label">Focus</dt><dd className="mt-1.5">{site.role}</dd></div>
                <div><dt className="label">Status</dt><dd className="mt-1.5">{site.availability}</dd></div>
              </dl>
              <a href={site.cv} target="_blank" rel="noopener" className="mt-8 inline-flex h-10 w-full items-center justify-center rounded-full bg-[var(--fg)] text-sm font-medium text-[var(--bg)]">
                Download résumé
              </a>
            </LiquidGlass>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.7] text-[var(--muted)]">
            <p>
              <span className="text-[var(--fg)]">I like the whole problem.</span> The database schema and the hover state, the
              deploy pipeline and the empty-state copy. Products feel good when every layer was built by someone who cared about the
              layer next to it.
            </p>
            <p>
              I work fast without being careless: small PRs, typed boundaries and decisions written down. I&apos;d rather ship a sharp
              version of the right thing than a polished version of the wrong one, and then iterate in the open.
            </p>
            <p>
              Outside of product work I teach, contribute to open source and dig into lower-level systems in C++ and Rust, mostly to
              understand the tools I rely on every day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shell mt-36">
        <Reveal><h2 className="label">Path</h2></Reveal>
        <ol className="mt-8 border-t hairline">
          {timeline.map((t, i) => (
            <li key={t.title + t.org} className="border-b hairline">
              <Reveal delay={i * 0.05} className="grid gap-2 py-8 sm:grid-cols-[10rem_1fr_1fr] sm:gap-8">
                <span className="label pt-1.5">{t.period}</span>
                <span>
                  <span className="block text-xl font-medium tracking-tight">{t.title}</span>
                  <span className="font-serif text-lg italic text-[var(--muted)]">{t.org}</span>
                </span>
                <span className="text-[15px] leading-relaxed text-[var(--muted)] sm:pt-1">{t.note}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell mt-36">
        <Reveal><h2 className="label">Toolkit</h2></Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {toolkit.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.06}>
              <LiquidGlass radius={24} className="h-full p-6">
                <h3 className="font-serif text-2xl italic">{g.group}</h3>
                <ul className="mt-6 space-y-2 text-[15px] text-[var(--muted)]">
                  {g.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </LiquidGlass>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell mt-36">
        <Reveal><h2 className="label">Principles</h2></Reveal>
        <div className="mt-8 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} className="border-t hairline pt-6">
              <h3 className="text-2xl font-medium tracking-tight">
                <span className="mr-3 font-serif italic text-[var(--faint)]">{String(i + 1).padStart(2, "0")}</span>
                {p.title}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-[var(--muted)]">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
