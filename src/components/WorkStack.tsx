"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/site";
import { LiquidGlass } from "./LiquidGlass";
import { Cover } from "./Cover";

function Card({ project, i, total }: { project: Project; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Cards only stack on wide screens; on phones they're taller than the viewport.
  const [stacked, setStacked] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setStacked(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Earlier cards recede as later ones slide over them.
  const scale = useTransform(scrollYProgress, [0, 1], [1, stacked ? 1 - (total - i) * 0.035 : 1]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, stacked ? 0.35 : 0]);

  return (
    <div ref={ref} className="mb-6 md:sticky md:mb-0 md:h-[78vh] md:min-h-[600px]" style={{ top: `calc(9vh + ${i * 22}px)` }}>
      <motion.div style={{ scale }} className="origin-top">
        <LiquidGlass radius={32} bezel={28} depth={52} frost={20} className="overflow-hidden">
          <Link
            href={`/work/${project.slug}`}
            className="group grid gap-0 md:grid-cols-[0.9fr_1.1fr]"
            aria-label={`${project.name} case study`}
          >
            <div className="flex flex-col justify-between gap-10 p-7 sm:p-10">
              <div className="flex items-center justify-between">
                <span className="label">
                  {String(i + 1).padStart(2, "0")} — {project.kind}
                </span>
                <span className="label">{project.year}</span>
              </div>
              <div>
                <h3 className="text-[clamp(2.5rem,5.5vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.04em]">
                  {project.name}
                </h3>
                <p className="mt-4 font-serif text-[clamp(1.25rem,2vw,1.6rem)] italic text-[var(--muted)]">
                  {project.tagline}
                </p>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--muted)]">{project.summary}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((s) => (
                    <li key={s} className="rounded-full border hairline px-2.5 py-1 text-xs text-[var(--muted)]">
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  Case study
                  <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
            <div className="p-3 md:pl-0">
              <Cover
                project={project}
                className="h-64 rounded-[22px] transition-transform duration-700 ease-out group-hover:scale-[1.015] md:h-full md:min-h-[480px]"
              />
            </div>
          </Link>
          <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-[var(--bg)]" />
        </LiquidGlass>
      </motion.div>
    </div>
  );
}

export function WorkStack({ items }: { items: Project[] }) {
  return (
    <div className="relative">
      {items.map((p, i) => (
        <Card key={p.slug} project={p} i={i} total={items.length} />
      ))}
    </div>
  );
}
