import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/site";
import { ProjectCover } from "./ProjectCover";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, image, logo, className, tall }: { project: Project; image?: string; logo?: string; className?: string; tall?: boolean }) {
  return (
    <Link href={`/work/${project.slug}`} className={cn("card group flex flex-col overflow-hidden p-2 transition-colors hover:border-[var(--faint)]", className)}>
      <ProjectCover
        project={project}
        image={image}
        // A minimum, not a fixed height: in a grid row the cover grows to take up any spare
        // space, so a short card's extra room goes to its image instead of a gap under the text.
        className={cn("flex-1 transition-transform duration-500 ease-out group-hover:scale-[0.985]", tall ? "min-h-[420px]" : project.platform === "tool" ? "min-h-[200px]" : "min-h-[360px]")}
      />
      <div className="flex flex-col p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="flex min-w-0 items-center gap-2.5 text-lg font-semibold tracking-tight">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {logo && <img src={logo} alt="" className="size-7 shrink-0 rounded-lg object-contain" loading="lazy" />}
            {project.name}
          </h3>
          <ArrowUpRight size={18} className="shrink-0 text-[var(--muted)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)]" />
        </div>
        <p className="mt-0.5 text-sm text-[var(--faint)]">{project.kind}</p>
        {/* Always two lines tall, so covers and titles line up across a row. */}
        <p className="mt-2 line-clamp-2 min-h-[3.25em] text-[15px] leading-relaxed text-[var(--muted)]">{project.summary}</p>
      </div>
    </Link>
  );
}
