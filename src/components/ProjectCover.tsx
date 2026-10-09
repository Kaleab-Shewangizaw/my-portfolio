import type { Project } from "@/content/site";
import { Mockup } from "./Mockup";
import { cn } from "@/lib/utils";

/** The admin-uploaded image when there is one, otherwise the drawn mockup. */
export function ProjectCover({ project, image, className }: { project: Project; image?: string; className?: string }) {
  if (!image) return <Mockup project={project} className={className} />;
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-[var(--surface-2)]", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={`${project.name} screenshot`} className="size-full object-cover object-top" loading="lazy" />
    </div>
  );
}
