import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/site";
import { ProjectCover } from "./ProjectCover";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, image, className, tall }: { project: Project; image?: string; className?: string; tall?: boolean }) {
  return (
    <Link href={`/work/${project.slug}`} className={cn("card group flex flex-col overflow-hidden p-2 transition-colors hover:border-[var(--faint)]", className)}>
      <ProjectCover
        project={project}
        image={image}
        className={cn("transition-transform duration-500 ease-out group-hover:scale-[0.985]", tall ? "h-[420px]" : project.platform === "tool" ? "h-[200px]" : "h-[360px]")}
      />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
          <ArrowUpRight size={18} className="shrink-0 text-[var(--muted)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)]" />
        </div>
        <p className="mt-0.5 text-sm text-[var(--faint)]">{project.kind}</p>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[var(--muted)]">{project.summary}</p>
      </div>
    </Link>
  );
}
