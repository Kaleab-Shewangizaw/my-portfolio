import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { siAppstore, siGoogleplay, type SimpleIcon } from "simple-icons";
import { ProjectCover } from "@/components/ProjectCover";
import { getProjectImages, getProjectLogos, getProjectScreenshots } from "@/lib/projectImages";
import { getProjects } from "@/lib/projects";
import { Reveal } from "@/components/Reveal";
import { Slideshow } from "@/components/Slideshow";

export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

function StoreLink({ href, icon, label }: { href: string; icon: SimpleIcon; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm font-medium hover:bg-[var(--surface-2)]">
      <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="currentColor" aria-hidden>
        <path d={icon.path} />
      </svg>
      {label} <ArrowUpRight size={14} />
    </a>
  );
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const projects = await getProjects();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const [images, logos, screenshots] = await Promise.all([getProjectImages(), getProjectLogos(), getProjectScreenshots(p.slug)]);
  const image = images[p.slug];
  const logo = logos[p.slug];

  return (
    <article className="shell pt-24 lg:pt-28">
      <Link href="/work" className="label inline-flex items-center gap-1.5 hover:text-[var(--fg)]">
        <ArrowLeft size={13} /> All work
      </Link>

      <Reveal className="mt-6 max-w-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {logo && <img src={logo} alt={`${p.name} logo`} className="mb-5 size-16 rounded-2xl object-contain" />}
        <p className="text-sm text-[var(--faint)]">{p.kind}</p>
        <h1 className="mt-2 text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-[1] tracking-[-0.045em]">{p.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">{p.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.links.live && (
            <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--fg)] px-4 text-sm font-medium text-[var(--bg)]">
              {p.links.liveLabel ?? "Try it"} <ArrowUpRight size={14} />
            </a>
          )}
          {p.links.code && (
            <a href={p.links.code} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[var(--line)] px-4 text-sm font-medium hover:bg-[var(--surface-2)]">
              See the code <ArrowUpRight size={14} />
            </a>
          )}
          {p.links.playStore && <StoreLink href={p.links.playStore} icon={siGoogleplay} label="Google Play" />}
          {p.links.appStore && <StoreLink href={p.links.appStore} icon={siAppstore} label="App Store" />}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="card mt-8 p-2">
        {/* With an image the cover takes the image's own shape; the drawn mockup needs a set height. */}
        <ProjectCover project={p} image={image} fit="natural" className={image ? undefined : "h-[300px] sm:h-[440px]"} />
      </Reveal>

      {screenshots.length > 0 && (
        <Reveal className="card mt-3 p-5 sm:p-8">
          <h2 className="text-lg font-semibold tracking-tight">A closer look</h2>
          <Slideshow images={screenshots.map((s) => s.url)} name={p.name} className="mx-auto mt-5 max-w-4xl" />
        </Reveal>
      )}

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        {p.highlights.length > 0 && (
          <Reveal className="card p-6 sm:p-8">
            <h2 className="text-lg font-semibold tracking-tight">What it does</h2>
            <ul className="mt-4 space-y-3">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[15px]">
                  <span className="mt-[8px] size-1.5 shrink-0 rounded-full bg-[var(--fg)]" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        <Reveal delay={0.08} className="card space-y-6 p-6 sm:p-8">
          {p.story.map((s) => (
            <div key={s.heading}>
              <h2 className="text-lg font-semibold tracking-tight">{s.heading}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{s.body}</p>
            </div>
          ))}
          {p.stack.length > 0 && <p className="border-t border-[var(--line)] pt-4 text-sm text-[var(--faint)]">Built with {p.stack.join(", ")}</p>}
        </Reveal>
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
