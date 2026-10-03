"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SECRETS, onSecret } from "@/lib/secrets";
import { LiquidGlass } from "./LiquidGlass";
import { Logo } from "./Logo";

type Toast = { key: number; title: string; body: string };

export function toast(title: string, body: string) {
  window.dispatchEvent(new CustomEvent("kalx:toast", { detail: { title, body } }));
}

export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    const push = (title: string, body: string) => {
      const key = Date.now() + Math.random();
      setItems((t) => [...t.slice(-2), { key, title, body }]);
      setTimeout(() => setItems((t) => t.filter((x) => x.key !== key)), 4200);
    };
    const offSecret = onSecret((id, count) => {
      const s = SECRETS.find((x) => x.id === id)!;
      push(`Secret found: ${s.title}`, `${count} of ${SECRETS.length}. Press ⌘K to see your list.`);
    });
    const onToast = (e: Event) => {
      const { title, body } = (e as CustomEvent).detail;
      push(title, body);
    };
    window.addEventListener("kalx:toast", onToast);
    return () => {
      offSecret();
      window.removeEventListener("kalx:toast", onToast);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-[min(340px,calc(100vw-32px))] flex-col gap-2" aria-live="polite">
      <AnimatePresence initial={false}>
        {items.map((t) => (
          <motion.div
            key={t.key}
            layout
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <LiquidGlass radius={16} bezel={14} depth={28} className="flex items-start gap-3 p-3.5">
              <Logo size={22} intro className="mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">{t.title}</p>
                <p className="mt-0.5 text-[13px] text-[var(--muted)]">{t.body}</p>
              </div>
            </LiquidGlass>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
