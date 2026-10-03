"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { unlock, visitCount } from "@/lib/secrets";
import { Logo } from "./Logo";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const PAGES = ["/", "/work", "/about", "/contact"];

/** Site-wide easter eggs: the Konami code and the page explorer. */
export function Discoveries() {
  const pathname = usePathname();
  const [party, setParty] = useState(false);

  useEffect(() => {
    try {
      const key = pathname.startsWith("/work") ? "/work" : pathname;
      const seen = new Set<string>(JSON.parse(localStorage.getItem("kalx:pages") || "[]"));
      seen.add(key);
      localStorage.setItem("kalx:pages", JSON.stringify([...seen]));
      if (PAGES.every((p) => seen.has(p))) unlock("explorer");
    } catch {}
  }, [pathname]);

  // Time- and visit-based secrets, checked on any page.
  useEffect(() => {
    if (visitCount() >= 3) unlock("regular");
    if (new Date().getHours() < 5) unlock("night");

    // A note for people who open DevTools.
    const w = window as unknown as { kalx?: () => string };
    w.kalx = () => {
      unlock("console");
      return "Found you. Most people never open the console. You're my kind of person.";
    };
    console.log(
      "%c Kal_X %c Hey, curious one. Type kalx() and press Enter.",
      "background:#d97e3a;color:#000;font-weight:700;padding:2px 6px;border-radius:4px",
      "color:#d97e3a",
    );
  }, []);

  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = k === KONAMI[pos] ? pos + 1 : k === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        unlock("konami");
        setParty(true);
        setTimeout(() => setParty(false), 2600);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {party && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[90] grid place-items-center bg-[var(--bg)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center">
            <motion.div className="mx-auto w-fit" initial={{ rotate: 0 }} animate={{ rotate: 720 }} transition={{ duration: 2.2, ease: [0.6, 0, 0.2, 1] }}>
              <Logo size={180} intro className="block" />
            </motion.div>
            <p className="mono mt-10 text-sm text-[var(--muted)]">+30 lives. You clearly grew up with games.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
