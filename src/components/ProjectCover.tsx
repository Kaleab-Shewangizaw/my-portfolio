import type { Project } from "@/content/site";
import { Mockup } from "./Mockup";
import { cn } from "@/lib/utils";

/**
 * The admin-uploaded image when there is one, otherwise the drawn mockup.
 * The image is never cropped. "frame" fits it inside the box className sizes (cards, so a row
 * lines up); "natural" lets the box take the image's own shape, up to a max height. Any space
 * left over is filled with a blurred copy of the same image rather than flat bars, and the image
 * sits inset from the edges like a framed screenshot.
 */
export function ProjectCover({ project, image, className, fit = "frame" }: { project: Project; image?: string; className?: string; fit?: "frame" | "natural" }) {
  if (!image) return <Mockup project={project} className={className} />;
  return (
    <div
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden rounded-2xl bg-[var(--surface-2)]",
        fit === "frame" ? "p-3 sm:p-4" : "p-4 sm:p-8",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" aria-hidden className="absolute inset-0 -z-10 size-full scale-125 object-cover opacity-50 blur-2xl" loading="lazy" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={`${project.name} screenshot`}
        className={cn(
          "h-auto w-auto max-w-full rounded-lg object-contain shadow-2xl shadow-black/30",
          fit === "frame" ? "max-h-full" : "max-h-[min(560px,70vh)] sm:rounded-xl",
        )}
        loading="lazy"
      />
    </div>
  );
}
