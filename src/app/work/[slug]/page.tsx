import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/ProjectCover";
import { getProjectImages } from "@/lib/projectImages";
import { getProjects } from "@/lib/projects";
import { Architecture } from "@/components/Architecture";
import { Reveal } from "@/components/Reveal";

export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };

const archFocus: Record<string, string> = { pazimo: "web", "pazimo-mobile": "attendee", "pazimo-organizer": "organizer" };

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const projects = await getProjects();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const focus = archFocus[p.slug];
  const image = (await getProjectImages())[p.slug];

  return (
    <article className="shell pt-24 lg:pt-28">
      <Link href="/work" className="label inline-flex items-center gap-1.5 hover:text-[var(--fg)]">
        <ArrowLeft size={13} /> All work
      </Link>

      <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="card flex flex-col p-6 sm:p-8">
          <p className="label">
            {p.kind} · {p.year}
          </p>
          <h1 className="mt-3 text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-[1] tracking-[-0.045em]">{p.name}</h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[var(--muted)]">{p.summary}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--line)] pt-5 text-sm">
            <div>
              <dt className="label">Role</dt>
              <dd className="mt-1">{p.role}</dd>
            </div>
            <div>
              <dt className="label">Year</dt>
              <dd className="mt-1">{p.year}</dd>
            </div>
          </dl>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {p.links.live && (
              <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--fg)] px-4 text-sm font-medium text-[var(--bg)]">
                {p.links.liveLabel ?? "Visit live"} <ArrowUpRight size={14} />
              </a>
            )}
            {p.links.code && (
              <a href={p.links.code} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[var(--line)] px-4 text-sm font-medium hover:bg-[var(--surface-2)]">
                Source on GitHub <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="card p-2">
          <ProjectCover project={p} image={image} className="h-full min-h-[280px] sm:min-h-[380px]" />
        </Reveal>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="card p-6">
          <p className="label">Highlights</p>
          <ul className="mt-4 space-y-3">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px]">
                <span className="mt-[8px] size-1.5 shrink-0 rounded-full bg-[var(--faint)]" />
                {h}
              </li>
            ))}
          </ul>
          <p className="label mt-8">Stack</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <li key={s} className="mono rounded-md bg-[var(--surface-2)] px-2 py-1 text-xs">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
        {focus ? (
          <Reveal delay={0.1} className="card p-5">
            <p className="label mb-3">Where it fits in Pazimo</p>
            <Architecture focus={focus} />
          </Reveal>
        ) : (
          <Reveal delay={0.1} className="card p-6">
            <p className="label">In one sentence</p>
            <p className="mt-4 text-[clamp(1.3rem,2.4vw,1.75rem)] font-medium leading-snug tracking-tight">{p.story[0]?.body ?? p.summary}</p>
          </Reveal>
        )}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
        {p.story.map((s, n) => (
          <Reveal key={s.heading} delay={n * 0.08} className="card p-6">
            <p className="mono text-sm text-[var(--faint)]">0{n + 1}</p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">{s.heading}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">{s.body}</p>
          </Reveal>
        ))}
      </div>

      <Link href={`/work/${next.slug}`} className="card group mt-3 flex items-center justify-between gap-4 p-6 transition-colors hover:border-[var(--faint)]">
        <span>
          <span className="label">Next project</span>
          <span className="mt-1 block text-2xl font-semibold tracking-tight">{next.name}</span>
        </span>
        <span className="grid size-12 place-items-center rounded-full bg-[var(--surface-2)] transition-colors group-hover:bg-[var(--fg)] group-hover:text-[var(--bg)]">
          <ArrowRight size={18} />
        </span>
      </Link>
    </article>
  );
}
