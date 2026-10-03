"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { site } from "@/content/site";
import { unlock } from "@/lib/secrets";
import { LocalTime } from "./LocalTime";
import { Logo } from "./Logo";
import { LogoFlight } from "./LogoFlight";

export function TopBar() {
  const [spin, setSpin] = useState(0);
  const [flight, setFlight] = useState<DOMRect | null>(null);
  const clicks = useRef<number[]>([]);
  const mark = useRef<HTMLSpanElement>(null);
  const land = useCallback(() => setFlight(null), []);

  // Every click nudges the mark; five quick ones and it breaks loose.
  const onLogo = (e: React.MouseEvent) => {
    if (flight) return e.preventDefault();
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 2000), now];
    setSpin((s) => s + 120);
    if (clicks.current.length >= 5) {
      e.preventDefault();
      clicks.current = [];
      unlock("logo");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setSpin((s) => s + 360);
      else if (mark.current) setFlight(mark.current.getBoundingClientRect());
    } else if (clicks.current.length > 1) {
      e.preventDefault();
    }
  };

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="shell flex h-16 items-center justify-between">
        <Link href="/" onClick={onLogo} className="flex items-center gap-2.5" aria-label={`${site.name}, home`}>
          <span ref={mark} className="block" style={{ opacity: flight ? 0 : 1 }}>
            <Logo size={30} intro spin={spin} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">{site.alias}</span>
        </Link>
        <div className="flex items-center gap-4 text-[13px]">
          <LocalTime className="mono hidden text-xs text-[var(--muted)] sm:inline" />
          <a
            href="https://pazimo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            <span className="size-2 rounded-full bg-[var(--accent)]" />
            {site.current}
          </a>
        </div>
      </div>
      {flight && <LogoFlight from={flight} onDone={land} />}
    </header>
  );
}
