"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { unlock } from "@/lib/secrets";
import { LocalTime } from "./LocalTime";
import { Logo } from "./Logo";
import { LogoFlight } from "./LogoFlight";

const ARM_AT = 5; // clicks needed before it can break loose
const LAUNCH_DELAY = 650; // ms of no clicking before it goes

export function TopBar() {
  const [flight, setFlight] = useState<{ from: DOMRect; charge: number; spin: number } | null>(null);
  const mark = useRef<HTMLSpanElement>(null);
  const spinner = useRef<HTMLSpanElement>(null);
  const spin = useRef({ angle: 0, vel: 0, clicks: 0, last: 0 });
  const raf = useRef(0);
  const launchTimer = useRef<number | undefined>(undefined);
  const land = useCallback(() => setFlight(null), []);

  // Spin physics for the mark while it's being charged up.
  const tick = useCallback(() => {
    let prev = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - prev) / 1000);
      prev = t;
      const s = spin.current;
      s.angle += s.vel * dt;
      s.vel *= Math.exp(-1.6 * dt); // friction
      // A nervous shake once it's armed.
      const shake = s.clicks >= ARM_AT ? Math.sin(t / 25) * Math.min(3, s.clicks / 5) : 0;
      if (spinner.current) spinner.current.style.transform = `translateX(${shake}px) rotate(${s.angle}deg)`;
      if (Math.abs(s.vel) > 2 || s.clicks >= ARM_AT) raf.current = requestAnimationFrame(loop);
      else {
        s.angle %= 360;
        raf.current = 0;
      }
    };
    if (!raf.current) raf.current = requestAnimationFrame(loop);
  }, []);

  useEffect(
    () => () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(launchTimer.current);
    },
    [],
  );

  const launch = useCallback(() => {
    const s = spin.current;
    const charge = s.clicks;
    const vel = s.vel;
    s.clicks = 0;
    s.vel = 0;
    s.angle = 0;
    cancelAnimationFrame(raf.current);
    raf.current = 0;
    if (spinner.current) spinner.current.style.transform = "";
    unlock("logo");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !mark.current) return;
    setFlight({ from: mark.current.getBoundingClientRect(), charge, spin: vel });
  }, []);

  // Every click adds spin. Past five clicks it's armed, and it launches once
  // you stop clicking: more clicks, more momentum.
  const onLogo = (e: React.MouseEvent) => {
    if (flight) return e.preventDefault();
    const s = spin.current;
    const now = performance.now();
    if (now - s.last > 1200) s.clicks = 0;
    s.last = now;
    s.clicks += 1;
    s.vel += 420 + s.clicks * 160;
    tick();
    if (s.clicks > 1) e.preventDefault();
    if (s.clicks >= ARM_AT) {
      clearTimeout(launchTimer.current);
      launchTimer.current = window.setTimeout(launch, LAUNCH_DELAY);
    }
  };

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="shell flex h-16 items-center justify-between">
        <Link href="/" onClick={onLogo} className="flex items-center gap-2.5" aria-label={`${site.name}, home`}>
          <span ref={mark} className="block" style={{ opacity: flight ? 0 : 1 }}>
            <span ref={spinner} className="block will-change-transform">
              <Logo size={30} intro />
            </span>
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
            <span className="size-2 rounded-full bg-[var(--faint)]" />
            {site.current}
          </a>
        </div>
      </div>
      {flight && <LogoFlight from={flight.from} charge={flight.charge} spin={flight.spin} onDone={land} />}
    </header>
  );
}
