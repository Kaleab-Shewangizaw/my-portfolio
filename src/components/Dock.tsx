"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Command, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { LiquidGlass } from "./LiquidGlass";
import { CommandPalette } from "./CommandPalette";
import { unlock } from "@/lib/secrets";
import { setGun, useBubbleWorld, world } from "@/lib/bubbles";
import type { ProjectLink } from "@/content/site";

function BubblesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="6" cy="9.5" r="4.25" />
      <circle cx="12.25" cy="4.5" r="2.5" />
      <circle cx="12.5" cy="12.25" r="1.25" />
      <path d="M4 8.2a2.2 2.2 0 0 1 1.6-1.4" strokeLinecap="round" />
    </svg>
  );
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Dock({ projects }: { projects: ProjectLink[] }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  useBubbleWorld();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.nav
        aria-label="Primary"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 pointer-events-none"
      >
        <LiquidGlass radius={999} bezel={18} depth={40} className="pointer-events-auto flex items-center gap-1 p-1.5">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative rounded-full px-3 py-2 text-[13px] font-medium sm:px-4"
              aria-current={active(item.href) ? "page" : undefined}
            >
              {active(item.href) && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-full bg-[var(--fg)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span
                className={
                  "relative transition-colors " +
                  (active(item.href) ? "text-[var(--bg)]" : "text-[var(--muted)] hover:text-[var(--fg)]")
                }
              >
                {item.label}
              </span>
            </Link>
          ))}
          <span className="mx-1 h-5 w-px bg-[var(--line)]" aria-hidden />
          <button
            onClick={() => setGun(!world.gun)}
            className={
              "hidden size-9 place-items-center rounded-full transition-colors sm:grid " +
              (world.gun ? "bg-[var(--fg)] text-[var(--bg)]" : "text-[var(--muted)] hover:text-[var(--fg)]")
            }
            aria-label={world.gun ? "Put the bubble gun away" : "Bubble gun"}
            aria-pressed={world.gun}
            title={world.gun ? "Put the bubble gun away (Esc)" : "Bubble gun"}
          >
            <BubblesIcon />
          </button>
          <button
            onClick={() => setPaletteOpen(true)}
            className="grid size-9 place-items-center rounded-full text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            aria-label="Open command menu"
          >
            <Command size={15} />
          </button>
          <button
            onClick={() => {
              setTheme(resolvedTheme === "dark" ? "light" : "dark");
              unlock("theme");
            }}
            className="grid size-9 place-items-center rounded-full text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            aria-label="Toggle theme"
          >
            {mounted && resolvedTheme === "light" ? <Moon size={15} /> : <Sun size={15} />}
          </button>
        </LiquidGlass>
      </motion.nav>
      <CommandPalette projects={projects} open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
