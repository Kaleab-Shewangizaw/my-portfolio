import type { Metadata } from "next";
import { projects } from "@/content/site";
import { WorkIndex } from "@/components/WorkIndex";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description: "Products, tools and open source — designed and engineered end to end.",
};

export default function WorkPage() {
  return (
    <section className="shell pt-40">
      <Reveal>
        <p className="label">Index — {projects.length} projects</p>
        <h1 className="mt-6 max-w-4xl text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.92] tracking-[-0.05em]">
          Things I&apos;ve <span className="font-serif italic">made real.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
          Products, tools and experiments. Each one designed, built and shipped end to end.
        </p>
      </Reveal>
      <div className="mt-20">
        <WorkIndex items={projects} />
      </div>
    </section>
  );
}
