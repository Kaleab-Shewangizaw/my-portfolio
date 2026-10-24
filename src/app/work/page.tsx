import type { Metadata } from "next";
import { WorkGrid } from "@/components/WorkGrid";
import { Reveal } from "@/components/Reveal";
import { getProjectImages } from "@/lib/projectImages";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Web platforms, mobile apps and side projects I've designed, built and shipped.",
};

export const revalidate = 3600;

export default async function WorkPage() {
  const [images, projects] = await Promise.all([getProjectImages(), getProjects()]);
  return (
    <section className="shell pt-24 lg:pt-28">
      <Reveal className="mb-8 max-w-2xl">
        <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-[1] tracking-[-0.045em]">My work</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--muted)]">
          Apps I built for Pazimo, plus small side projects. Tap any project to learn more.
        </p>
      </Reveal>
      <WorkGrid items={projects} images={images}>
        <span className="label">{projects.length} projects</span>
      </WorkGrid>
    </section>
  );
}
