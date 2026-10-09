"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/content/site";
import { ProjectCard } from "./ProjectCard";

const filters = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "tool", label: "Side projects" },
] as const;

export function WorkGrid({ items, images = {}, children }: { items: Project[]; images?: Record<string, string>; children?: React.ReactNode }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const shown = filter === "all" ? items : items.filter((p) => p.platform === filter);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-full border border-[var(--line)] p-1" role="tablist" aria-label="Filter projects">
          {filters.map((f) => (
            <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)} className="relative rounded-full px-3.5 py-1.5 text-sm">
              {filter === f.id && <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-[var(--fg)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className={"relative transition-colors " + (filter === f.id ? "text-[var(--bg)]" : "text-[var(--muted)] hover:text-[var(--fg)]")}>{f.label}</span>
            </button>
          ))}
        </div>
        {children}
      </div>
      <motion.div layout className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ProjectCard project={p} image={images[p.slug]} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
