"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { site } from "@/content/site";
import { unlock } from "@/lib/secrets";
import { LocalTime } from "./LocalTime";
import { Logo } from "./Logo";

export function TopBar() {
  const [spin, setSpin] = useState(0);
  const clicks = useRef<number[]>([]);

  // Five quick clicks on the mark sends it spinning.
  const onLogo = (e: React.MouseEvent) => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 2000), now];
    setSpin((s) => s + 120);
    if (clicks.current.length >= 5) {
      e.preventDefault();
      clicks.current = [];
      setSpin((s) => s + 1080);
      unlock("logo");
    } else if (clicks.current.length > 1) {
      e.preventDefault();
    }
  };

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="shell flex h-16 items-center justify-between">
        <Link href="/" onClick={onLogo} className="flex items-center gap-2.5" aria-label={`${site.name}, home`}>
          <Logo size={30} intro spin={spin} />
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
    </header>
  );
}
