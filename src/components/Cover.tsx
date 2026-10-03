import type { Project } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Generated cover art: a tinted field with an abstract app window floating
 * in it. Consistent across projects, no screenshots to keep up to date.
 */
export function Cover({ project, className }: { project: Project; className?: string }) {
  const h = project.hue;
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        background: `radial-gradient(80% 90% at 15% 10%, hsl(${h} 80% 62% / 0.55), transparent 60%),
          radial-gradient(70% 80% at 90% 100%, hsl(${(h + 40) % 360} 75% 55% / 0.5), transparent 60%),
          hsl(${h} 30% 12%)`,
      }}
    >
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgb(255_255_255/.35)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/.35)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute inset-x-[10%] bottom-0 top-[16%] rounded-t-2xl border border-white/20 bg-white/[0.07] shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="size-2 rounded-full bg-white/30" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/10" />
          <span className="ml-3 h-2 w-24 rounded-full bg-white/10" />
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-4 p-5">
          <div className="space-y-2.5">
            {[70, 90, 55, 80].map((w, i) => (
              <div key={i} className="h-2 rounded-full bg-white/15" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="space-y-3">
            <div className="font-serif text-[clamp(1.75rem,4vw,3.25rem)] italic leading-none text-white/90">
              {project.name}
            </div>
            <div className="h-2 w-3/4 rounded-full bg-white/15" />
            <div className="h-2 w-1/2 rounded-full bg-white/10" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-lg border border-white/10"
                  style={{ background: `hsl(${(h + i * 18) % 360} 70% 60% / ${0.25 - i * 0.06})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
