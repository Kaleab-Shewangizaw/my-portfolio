"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Build } from "@/content/site";

/** Collapsible list of client work under a timeline entry. */
export function Builds({ items }: { items: Build[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mono inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--fg)]"
      >
        What I built here ({items.length})
        <ChevronDown size={13} className={"transition-transform duration-300 " + (open ? "rotate-180" : "")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="overflow-hidden"
          >
            {items.map((b, i) => (
              <motion.li
                key={b.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06 }}
                className="mt-2 rounded-xl bg-[var(--surface-2)] p-4 first:mt-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{b.name}</p>
                    <p className="mono text-xs text-[var(--muted)]">for {b.client}</p>
                  </div>
                  <a
                    href={b.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono inline-flex shrink-0 items-center gap-1 text-xs text-[var(--accent-text)] hover:underline"
                  >
                    {new URL(b.href).hostname} <ArrowUpRight size={12} />
                  </a>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{b.body}</p>
                {b.stack.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {b.stack.map((s) => (
                      <li key={s} className="mono rounded-md bg-[var(--surface)] px-2 py-0.5 text-[11px] text-[var(--muted)]">
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
