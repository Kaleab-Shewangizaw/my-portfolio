import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/site";
import { Cover } from "@/components/Cover";
import { LiquidGlass } from "@/components/LiquidGlass";
import { Reveal } from "@/components/Reveal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  const project = projects[i];
  const next = projects[(i + 1) % projects.length];

  const meta = [
    { k: "Role", v: project.role },
    { k: "Year", v: project.year },
    { k: "Type", v: project.kind },
    { k: "Stack", v: project.stack.join(", ") },
  ];

  return (
    <article className="pt-36">
      <div className="shell">
        <Link href="/work" className="label inline-flex items-center gap-2 hover:text-[var(--fg)]">
          <ArrowLeft size={13} /> All work
        </Link>
        <Reveal className="mt-10">
          <p className="label">
            {String(i + 1).padStart(2, "0")} — {project.kind}
          </p>
          <h1 className="mt-5 text-[clamp(3.5rem,12vw,11rem)] font-medium leading-[0.85] tracking-[-0.055em]">{project.name}</h1>
          <p className="mt-6 max-w-3xl font-serif text-[clamp(1.5rem,3.2vw,2.6rem)] italic leading-tight text-[var(--muted)]">
            {project.tagline}
          </p>
        </Reveal>
      </div>

      <Reveal className="shell mt-16">
        <LiquidGlass radius={34} bezel={30} depth={56} frost={16} className="p-2.5">
          <Cover project={project} className="aspect-[4/3] rounded-[26px] sm:aspect-[16/8]" />
        </LiquidGlass>
      </Reveal>

      <div className="shell mt-16 grid gap-12 md:grid-cols-[1fr_2fr]">
        <dl className="grid h-fit grid-cols-2 gap-x-6 gap-y-8 md:sticky md:top-28 md:grid-cols-1">
          {meta.map((m) => (
            <div key={m.k}>
              <dt className="label">{m.k}</dt>
              <dd className="mt-2 text-[15px]">{m.v}</dd>
            </div>
          ))}
          <div className="col-span-2 flex flex-wrap gap-2 md:col-span-1">
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--fg)] px-5 text-sm font-medium text-[var(--bg)]">
                Visit <ArrowUpRight size={14} />
              </a>
            )}
            {project.links.code && (
              <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="glass inline-flex h-10 items-center gap-1.5 rounded-full px-5 text-sm font-medium">
                Source <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </dl>

        <div>
          <Reveal>
            <p className="text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.3] tracking-[-0.02em]">{project.summary}</p>
          </Reveal>
          <div className="mt-20 space-y-16">
            {project.story.map((s, n) => (
              <Reveal key={s.heading} className="grid gap-4 border-t hairline pt-8 sm:grid-cols-[10rem_1fr]">
                <h2 className="label !text-[var(--fg)]">
                  <span className="text-[var(--faint)]">{String(n + 1).padStart(2, "0")}</span>&nbsp;&nbsp;{s.heading}
                </h2>
                <p className="text-[17px] leading-[1.75] text-[var(--muted)]">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="shell mt-40">
        <Link href={`/work/${next.slug}`} className="group block border-t hairline pt-10">
          <span className="label">Next project</span>
          <span className="mt-4 flex items-end justify-between gap-6">
            <span className="text-[clamp(2.75rem,9vw,8rem)] font-medium leading-[0.9] tracking-[-0.05em] transition-transform duration-700 group-hover:translate-x-3">
              {next.name}
            </span>
            <ArrowUpRight className="mb-3 size-10 shrink-0 text-[var(--muted)] transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--fg)] sm:size-16" strokeWidth={1.25} />
          </span>
        </Link>
      </div>
    </article>
  );
}
