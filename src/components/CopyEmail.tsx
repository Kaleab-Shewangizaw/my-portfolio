"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };
  return (
    <button onClick={copy} className={cn("group inline-flex items-center gap-3", className)} aria-label="Copy email address">
      <span className="link-underline">{site.email}</span>
      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[var(--line)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={copied ? "y" : "n"} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
    </button>
  );
}
