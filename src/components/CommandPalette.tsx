"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowUpRight, CornerDownLeft, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects, site } from "@/content/site";
import { LiquidGlass } from "./LiquidGlass";
import { SECRETS, unlock, useSecrets } from "@/lib/secrets";

type Item = { group: string; label: string; hint?: string; run: () => void };

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const found = useSecrets();

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    const ext = (href: string) => () => window.open(href, "_blank", "noopener");
    return [
      { group: "Navigate", label: "Home", run: go("/") },
      { group: "Navigate", label: "Work", run: go("/work") },
      { group: "Navigate", label: "About", run: go("/about") },
      { group: "Navigate", label: "Contact", run: go("/contact") },
      { group: "Navigate", label: "Testimonials", run: go("/testimonials") },
      { group: "Navigate", label: "Leave a testimonial", hint: "worked with me?", run: go("/testimonials/new") },
      ...projects.map((p) => ({ group: "Case studies", label: p.name, hint: p.kind, run: go(`/work/${p.slug}`) })),
      {
        group: "Actions",
        label: "Copy email",
        hint: site.email,
        run: () => navigator.clipboard?.writeText(site.email),
      },
      { group: "Actions", label: "Download CV", hint: "PDF", run: ext(site.cv) },
      {
        group: "Actions",
        label: `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`,
        run: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          unlock("theme");
        },
      },
      ...site.socials.map((s) => ({ group: "Elsewhere", label: s.label, hint: s.handle, run: ext(s.href) })),
      ...SECRETS.map((s) => ({
        group: `Secrets · ${found.length}/${SECRETS.length} found`,
        label: found.includes(s.id) ? `✓ ${s.title}` : "Locked",
        hint: found.includes(s.id) ? "found" : s.hint,
        run: () => {},
      })),
    ];
  }, [router, resolvedTheme, setTheme, found]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => (i.label + " " + (i.hint ?? "") + " " + i.group).toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (open) {
      unlock("palette");
      setQuery("");
      setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  const run = (item?: Item) => {
    if (!item) return;
    onClose();
    item.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[index]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={onClose}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="relative w-full max-w-xl"
            initial={{ y: 12, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 8, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 36 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <LiquidGlass radius={22} bezel={20} depth={36} frost={14} className="overflow-hidden">
              <div className="flex items-center gap-3 border-b border-[var(--line)] px-4">
                <Search size={16} className="text-[var(--muted)]" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Jump to a page, project or action…"
                  className="h-14 flex-1 bg-transparent text-[15px] outline-none focus-visible:outline-none placeholder:text-[var(--faint)]"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-list"
                  aria-activedescendant={filtered[index] ? `palette-${index}` : undefined}
                />
                <kbd className="label rounded-md border border-[var(--line)] px-1.5 py-0.5 !text-[10px]">Esc</kbd>
              </div>
              <ul id="palette-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <li className="px-3 py-8 text-center text-sm text-[var(--muted)]">Nothing matches “{query}”.</li>
                )}
                {filtered.map((item, i) => {
                  const header = item.group !== lastGroup ? item.group : null;
                  lastGroup = item.group;
                  return (
                    <li key={item.group + item.label + item.hint} role="presentation">
                      {header && <div className="label px-3 pb-1.5 pt-3">{header}</div>}
                      <div
                        id={`palette-${i}`}
                        role="option"
                        aria-selected={i === index}
                        onMouseMove={() => setIndex(i)}
                        onClick={() => run(item)}
                        className={
                          "flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors " +
                          (i === index ? "bg-[var(--fg)]/[0.07]" : "")
                        }
                      >
                        <span>{item.label}</span>
                        <span className="flex items-center gap-2 text-xs text-[var(--muted)]">
                          {item.hint}
                          {i === index &&
                            (item.group === "Elsewhere" || item.label === "Download CV" ? (
                              <ArrowUpRight size={13} />
                            ) : (
                              <CornerDownLeft size={13} />
                            ))}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </LiquidGlass>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
