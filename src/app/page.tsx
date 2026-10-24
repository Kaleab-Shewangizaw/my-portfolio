import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { site } from "@/content/site";
import { getApproved } from "@/lib/testimonials";
import { getProjectImages, getProjectLogos } from "@/lib/projectImages";
import { getProjects } from "@/lib/projects";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { CopyEmail } from "@/components/CopyEmail";

function SectionHead({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {sub && <p className="mt-1 text-[var(--muted)]">{sub}</p>}
      </div>
      {action && <div className="whitespace-nowrap pb-1">{action}</div>}
    </div>
  );
}

export const revalidate = 3600;

export default async function Home() {
  const [kind, images, logos, projects] = await Promise.all([getApproved(3), getProjectImages(), getProjectLogos(), getProjects()]);
  const pazimo = projects.filter((p) => p.slug.startsWith("pazimo"));
  const others = projects.filter((p) => !p.slug.startsWith("pazimo")).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="shell grid grid-cols-1 items-center gap-10 pb-6 pt-24 md:grid-cols-[1fr_300px] lg:pt-32">
        <Reveal>
          <h1 className="text-[clamp(2.4rem,4.6vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
            Hi, I&apos;m Kaleab.
            <br />
            <span className="text-[var(--muted)]">I build apps people use every day.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[var(--muted)]">{site.intro}</p>
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
        <Reveal delay={0.15} className="hidden md:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[var(--surface-2)]">
            <Image src="/me.jpg" alt={`Portrait of ${site.name}`} fill sizes="300px" priority className="object-cover" />
          </div>
        </Reveal>
      </section>

      {/* Pazimo */}
      <section className="shell mt-16">
        <SectionHead
          title="Pazimo"
          sub="An event ticketing startup, where I'm CTO and solo engineer."
          action={
            <a href="https://pazimo.com" target="_blank" rel="noopener noreferrer" className="label link-underline hover:text-[var(--fg)]">
              pazimo.com ↗
            </a>
          }
        />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {pazimo.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <ProjectCard project={p} image={images[p.slug]} logo={logos[p.slug]} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Side projects */}
      <section className="shell mt-16">
        <SectionHead title="Side projects" sub="Small tools I made for myself and friends." action={<Link href="/work" className="label link-underline hover:text-[var(--fg)]">See all</Link>} />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <ProjectCard project={p} image={images[p.slug]} logo={logos[p.slug]} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials (only once some are approved) */}
      {kind.length > 0 && (
        <section className="shell mt-16">
          <SectionHead title="What people say" action={<Link href="/testimonials" className="label link-underline hover:text-[var(--fg)]">Read all</Link>} />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {kind.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.06} className={i === 0 ? "md:col-span-2" : "h-full"}>
                <TestimonialCard featured={i === 0} className="h-full" t={{ ...t, avatarSrc: t.hasAvatar ? `/api/testimonials/${t.id}/avatar` : null }} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
