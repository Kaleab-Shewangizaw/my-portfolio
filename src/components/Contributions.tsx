"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Day } from "@/lib/github";

const mix = (n: number) => `color-mix(in srgb, var(--fg) ${n}%, var(--surface-2))`;
const shade = ["var(--surface-2)", mix(25), mix(50), mix(75), "var(--fg)"];

export function Contributions({ days }: { days: Day[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hover, setHover] = useState<Day | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  // On narrow screens the year doesn't fit; start at the latest weeks.
  useEffect(() => {
    if (scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth;
  }, []);

  // Pad the start so columns are full weeks (Sunday first).
  const pad = new Date(days[0].date).getDay();
  const cells: (Day | null)[] = [...Array(pad).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  const best = days.reduce((a, b) => (b.count > a.count ? b : a), days[0]);

  return (
    <div ref={ref}>
      <div ref={scroller} className="overflow-x-auto pb-1">
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
