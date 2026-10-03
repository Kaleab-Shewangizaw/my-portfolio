import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { now, projects, site, stack, timeline } from "@/content/site";
import { getGitHub } from "@/lib/github";
import { getApproved } from "@/lib/testimonials";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { Terminal } from "@/components/Terminal";
import { Architecture } from "@/components/Architecture";
import { ProjectCard } from "@/components/ProjectCard";
import { Contributions } from "@/components/Contributions";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { CopyEmail } from "@/components/CopyEmail";

function Headline({ as: Tag }: { as: "h1" }) {
  return (
    <Tag className="py-2 text-[clamp(2.5rem,5.2vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
      Hi, I&apos;m Kaleab.
      <br />
      <span className="text-[var(--muted)]">I build apps people use every day.</span>
    </Tag>
  );
}

function SectionHead({ index, title, action }: { index: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="flex items-baseline gap-3 text-xl font-semibold tracking-tight sm:text-2xl">
        <span className="mono text-sm font-normal text-[var(--accent-text)]">{index}</span>
        {title}
      </h2>
      {action}
    </div>
  );
}

export const revalidate = 3600;

export default async function Home() {
  const [gh, kind] = await Promise.all([getGitHub(), getApproved(6)]);
  let n = 2;
  const next = () => String(++n).padStart(2, "0");
  const pazimo = projects.filter((p) => p.slug.startsWith("pazimo"));
  const others = projects.filter((p) => !p.slug.startsWith("pazimo"));
  const years = new Date().getFullYear() - site.startedCoding;

  const stats = [
    { value: gh?.total ?? 1385, label: "GitHub contributions in the last year" },
    { value: gh?.repos ?? 59, label: "public repositories" },
    { value: 4, label: "Pazimo products running on one API" },
    { value: years, suffix: "+", label: "years of writing code every day" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="shell grid items-center gap-8 pb-10 pt-24 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pt-28">
        <Reveal>
          <p className="label">~/kaleab · {site.role.toLowerCase()} · {site.city.toLowerCase()}</p>
          <div className="mt-4">
            <Headline as="h1" />
          </div>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--muted)]">{site.intro}</p>
          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <Link href="/work" className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--fg)] px-5 text-sm font-medium text-[var(--bg)] transition-transform active:scale-95">
              See my work <ArrowUpRight size={15} />
            </Link>
            <a href={site.cv} target="_blank" rel="noopener" className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--line)] px-5 text-sm font-medium transition-colors hover:bg-[var(--surface-2)]">
              <Download size={15} /> Résumé
            </a>
          </div>
          <CopyEmail className="mt-6 text-sm text-[var(--muted)]" />
        </Reveal>
        <Reveal delay={0.15}>
          <Terminal />
        </Reveal>
      </section>

      {/* Stats */}
      <section className="shell">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="card p-5">
              <p className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.04em]">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pazimo */}
      <section className="shell mt-16">
        <SectionHead index="01" title="Pazimo: one backend, three apps" action={<Link href="/work/pazimo" className="label link-underline hover:text-[var(--fg)]">Read the case study</Link>} />
        <div className="grid gap-3 lg:grid-cols-[1fr_1.35fr]">
          <Reveal className="card flex flex-col p-6">
            <p className="text-[17px] leading-relaxed">
              Pazimo is a ticketing, invitation and RSVP platform for Ethiopia. I&apos;m the CTO. I lead the engineering team and own the API, the web app, both mobile apps, and the servers and deploys that keep them running.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[var(--muted)]">
              {pazimo[0].highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  {h}
                </li>
              ))}
            </ul>
            <a href="https://pazimo.com" target="_blank" rel="noopener noreferrer" className="mono mt-auto inline-flex items-center gap-1.5 pt-6 text-sm text-[var(--accent-text)] hover:underline">
              pazimo.com <ArrowUpRight size={14} />
            </a>
          </Reveal>
          <Reveal delay={0.1} className="card p-5">
            <Architecture />
          </Reveal>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {pazimo.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <ProjectCard project={p} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Side projects */}
      <section className="shell mt-16">
        <SectionHead index="02" title="Things I build on the side" action={<Link href="/work" className="label link-underline hover:text-[var(--fg)]">All projects</Link>} />
        <div className="grid gap-3 md:grid-cols-2">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <ProjectCard project={p} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials (only once some are approved) */}
      {kind.length > 0 && (
        <section className="shell mt-16">
          <SectionHead index={next()} title="Kind words" action={<Link href="/testimonials" className="label link-underline hover:text-[var(--fg)]">Read all</Link>} />
          <div className="columns-1 gap-3 md:columns-2 lg:columns-3 [&>*]:mb-3">
            {kind.map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 0.06} className="break-inside-avoid">
                <TestimonialCard t={{ ...t, avatarSrc: t.hasAvatar ? `/api/testimonials/${t.id}/avatar` : null }} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Activity + now */}
      <section className="shell mt-16">
        <SectionHead index={next()} title="What I've been up to" />
        <div className="grid gap-3 lg:grid-cols-[1fr_320px]">
          {gh && (
            <Reveal className="card min-w-0 p-5">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">
                  {gh.total.toLocaleString()} contributions <span className="text-[var(--muted)]">in the last year</span>
                </p>
                <a href={`https://github.com/${site.github}`} target="_blank" rel="noopener noreferrer" className="mono text-xs text-[var(--muted)] hover:text-[var(--fg)]">
                  github.com/{site.github} ↗
                </a>
              </div>
              <Contributions days={gh.contributions} />
            </Reveal>
          )}
          <Reveal delay={0.08} className="card p-5">
            <p className="label">now.txt</p>
            <ul className="mt-4 space-y-3">
              {now.map((n) => (
                <li key={n} className="flex gap-3 text-[15px]">
                  <span className="mono text-[var(--accent-text)]">→</span>
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Stack + experience */}
      <section className="shell mt-16">
        <SectionHead index={next()} title="Tools and experience" action={<Link href="/about" className="label link-underline hover:text-[var(--fg)]">More about me</Link>} />
        <div className="grid gap-3 lg:grid-cols-2">
          <Reveal className="card p-5">
            <dl className="divide-y divide-[var(--line)]">
              {stack.map((s) => (
                <div key={s.group} className="grid gap-2 py-3 first:pt-0 last:pb-0 sm:grid-cols-[110px_1fr]">
                  <dt className="label pt-1">{s.group}</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span key={it} className="rounded-md bg-[var(--surface-2)] px-2 py-1 text-[13px] transition-colors hover:bg-[var(--accent)] hover:text-black">
                        {it}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.08} className="card p-5">
            <ol className="relative space-y-5 border-l border-[var(--line)] pl-5">
              {timeline.slice(0, 4).map((t, i) => (
                <li key={t.title + t.org} className="relative">
                  <span className={"absolute -left-[25px] top-1.5 size-2.5 rounded-full border-2 border-[var(--surface)] " + (i === 0 ? "bg-[var(--accent)]" : "bg-[var(--faint)]")} />
                  <p className="mono text-xs text-[var(--muted)]">{t.period}</p>
                  <p className="mt-0.5 font-medium">
                    {t.title} <span className="text-[var(--muted)]">· {t.org}</span>
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--muted)]">{t.note}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    </>
  );
}
