"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { Project } from "@/content/site";
import { Cover } from "./Cover";

const filters = ["All", "Product", "Tool", "Open source"] as const;

export function WorkIndex({ items }: { items: Project[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [hovered, setHovered] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 260, damping: 28 });
  const py = useSpring(y, { stiffness: 260, damping: 28 });

  const shown = useMemo(() => (filter === "All" ? items : items.filter((p) => p.kind === filter)), [filter, items]);

  return (
    <div onPointerMove={(e) => (x.set(e.clientX), y.set(e.clientY))}>
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className="relative rounded-full px-4 py-2 text-sm"
          >
            {filter === f && (
              <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-[var(--fg)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            )}
            <span className={"relative transition-colors " + (filter === f ? "text-[var(--bg)]" : "text-[var(--muted)] hover:text-[var(--fg)]")}>{f}</span>
          </button>
        ))}
      </div>

      <ul className="border-t hairline">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-b hairline"
              onPointerEnter={() => setHovered(p)}
              onPointerLeave={() => setHovered(null)}
            >
              <Link
                href={`/work/${p.slug}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-7 sm:grid-cols-[3rem_1.2fr_1fr_6rem_2rem] sm:py-9"
              >
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium leading-none tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-2">
                  {p.name}
                </span>
                <span className="hidden font-serif text-lg italic text-[var(--muted)] sm:block">{p.tagline}</span>
                <span className="label hidden sm:block">{p.kind}</span>
                <span className="flex items-center justify-end gap-3">
                  <span className="label sm:hidden">{p.year}</span>
                  <ArrowUpRight size={18} className="text-[var(--muted)] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)]" />
                </span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Floating preview that trails the cursor (pointer devices only). */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(hover:hover)]:block"
        style={{ x: px, y: py }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.slug}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="glass -translate-y-1/2 translate-x-8 rounded-[22px] p-1.5"
            >
              <Cover project={hovered} className="h-[220px] w-[320px] rounded-[17px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
