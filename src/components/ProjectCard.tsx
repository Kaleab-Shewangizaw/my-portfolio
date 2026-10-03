import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/site";
import { Mockup } from "./Mockup";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, className, tall }: { project: Project; className?: string; tall?: boolean }) {
  return (
    <Link href={`/work/${project.slug}`} className={cn("card group flex flex-col overflow-hidden p-2 transition-colors hover:border-[var(--faint)]", className)}>
      <Mockup
        project={project}
        className={cn("transition-transform duration-500 ease-out group-hover:scale-[0.985]", tall ? "h-[420px]" : project.platform === "tool" ? "h-[200px]" : "h-[360px]")}
      />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
          <ArrowUpRight size={18} className="shrink-0 text-[var(--muted)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
        </div>
        <p className="label mt-1">
          {project.kind} · {project.year}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">{project.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.stack.slice(0, 4).map((s) => (
            <li key={s} className="mono rounded-md bg-[var(--surface-2)] px-2 py-0.5 text-[11px] text-[var(--muted)]">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
