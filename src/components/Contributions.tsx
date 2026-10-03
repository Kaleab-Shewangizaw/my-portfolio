"use client";

import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import type { Day } from "@/lib/github";

const shade = ["var(--surface-2)", "rgb(217 126 58 / .3)", "rgb(217 126 58 / .55)", "rgb(217 126 58 / .8)", "rgb(217 126 58)"];

export function Contributions({ days }: { days: Day[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hover, setHover] = useState<Day | null>(null);

  // Pad the start so columns are full weeks (Sunday first).
  const pad = new Date(days[0].date).getDay();
  const cells: (Day | null)[] = [...Array(pad).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  const best = days.reduce((a, b) => (b.count > a.count ? b : a), days[0]);

  return (
    <div ref={ref}>
      <div className="overflow-x-auto pb-1">
        <div className={"flex w-max gap-[3px] " + (inView ? "" : "paused")}>
          {weeks.map((w, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {w.map((d, di) =>
                d ? (
                  <span
                    key={di}
                    className="cell size-[11px] rounded-[3px]"
                    style={{ background: shade[d.level], animationDelay: `${wi * 14}ms` }}
                    onMouseEnter={() => setHover(d)}
                    onMouseLeave={() => setHover(null)}
                  />
                ) : (
                  <span key={di} className="size-[11px]" />
                ),
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--muted)]">
        <span className="mono min-h-4">
          {hover
            ? `${hover.count} contribution${hover.count === 1 ? "" : "s"} on ${new Date(hover.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
            : `Busiest day: ${best.count} on ${new Date(best.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
        </span>
        <span className="flex items-center gap-1">
          Less
          {shade.map((s) => (
            <span key={s} className="size-[11px] rounded-[3px]" style={{ background: s }} />
          ))}
          More
        </span>
      </div>
    </div>
  );
}
