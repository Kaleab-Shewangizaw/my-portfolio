"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { unlock } from "@/lib/secrets";

const SIZE = 104;
const DRIFT = 28; // px per second when left alone

/**
 * Displacement map for a convex lens: every pixel samples from closer to the
 * centre (magnification), with extra bending toward the rim like real glass.
 */
function lensMap(size: number) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  const r = size / 2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x + 0.5 - r;
      const dy = y + 0.5 - r;
      const d = Math.hypot(dx, dy) / r;
      const i = (y * size + x) * 4;
      let sx = 0;
      let sy = 0;
      if (d < 1) {
        // Gentle uniform zoom in the middle, steep bend at the edge.
        const k = 0.32 * d + 0.38 * Math.pow(d, 5);
        sx = (-dx / (d * r || 1)) * k;
        sy = (-dy / (d * r || 1)) * k;
      }
      img.data[i] = 128 + sx * 127;
      img.data[i + 1] = 128 + sy * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

/**
 * A liquid-glass bubble that floats freely over the whole page. It drifts on
 * its own, can be grabbed and thrown, and pops on double-click.
 * Chromium gets true refraction; other browsers get frosted glass.
 */
export function Bubble() {
  const pathname = usePathname();
  const el = useRef<HTMLDivElement>(null);
  const id = "bubble" + useId().replace(/:/g, "");
  const [map, setMap] = useState<string | null>(null);
  const [alive, setAlive] = useState(true);
  const [popped, setPopped] = useState(false);
  const state = useRef({ x: 0, y: 0, vx: DRIFT, vy: DRIFT * 0.6, dragging: false, lastX: 0, lastY: 0, lastT: 0 });

  useEffect(() => {
    const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands;
    if (brands?.some((b) => b.brand === "Chromium")) setMap(lensMap(SIZE));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAlive(false);
    try {
      if (sessionStorage.getItem("kalx:popped")) setAlive(false);
    } catch {}
  }, []);

  useEffect(() => {
    if (!alive) return;
    const s = state.current;
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    s.x = W() * 0.62;
    s.y = H() * 0.32;
    // Random heading each visit.
    const a = Math.random() * Math.PI * 2;
    s.vx = Math.cos(a) * DRIFT;
    s.vy = Math.sin(a) * DRIFT;

    let raf = 0;
    let prev = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - prev) / 1000);
      prev = t;
      if (!s.dragging) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        // Throws slow down until they settle back into a lazy drift.
        const speed = Math.hypot(s.vx, s.vy);
        if (speed > DRIFT) {
          const f = Math.max(DRIFT / speed, 1 - 2.2 * dt);
          s.vx *= f;
          s.vy *= f;
        }
        const maxX = W() - SIZE;
        const maxY = H() - SIZE;
        if (s.x < 0 || s.x > maxX) {
          s.x = Math.min(Math.max(s.x, 0), maxX);
          s.vx = s.x === 0 ? Math.abs(s.vx) : -Math.abs(s.vx);
        }
        if (s.y < 0 || s.y > maxY) {
          s.y = Math.min(Math.max(s.y, 0), maxY);
          s.vy = s.y === 0 ? Math.abs(s.vy) : -Math.abs(s.vy);
        }
      }
      if (el.current) el.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [alive]);

  const onDown = (e: React.PointerEvent) => {
    const s = state.current;
    s.dragging = true;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.lastT = performance.now();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.dragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - s.lastT) / 1000;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.x += dx;
    s.y += dy;
    s.vx = dx / dt;
    s.vy = dy / dt;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.lastT = now;
  };
  const onUp = () => {
    const s = state.current;
    s.dragging = false;
    // Cap the throw so it can't rocket off forever.
    const speed = Math.hypot(s.vx, s.vy);
    const max = 1800;
    if (speed > max) {
      s.vx *= max / speed;
      s.vy *= max / speed;
    }
    if (speed < DRIFT) {
      const a = Math.random() * Math.PI * 2;
      s.vx = Math.cos(a) * DRIFT;
      s.vy = Math.sin(a) * DRIFT;
    }
  };
  const pop = () => {
    setPopped(true);
    unlock("bubble");
    try {
      sessionStorage.setItem("kalx:popped", "1");
    } catch {}
    setTimeout(() => setAlive(false), 450);
  };

  // Stay out of the way on forms and admin screens.
  if (!alive || pathname.startsWith("/admin") || pathname === "/testimonials/new") return null;

  const filter = map ? `blur(0.4px) url(#${id}) saturate(130%)` : "blur(3px) saturate(150%)";

  return (
    <div
      ref={el}
      className="bubble fixed left-0 top-0 z-[45] cursor-grab touch-none select-none active:cursor-grabbing print:hidden"
      style={{ width: SIZE, height: SIZE }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onDoubleClick={pop}
      role="presentation"
      title="Drag me. Double-click to pop."
    >
      <AnimatePresence>
        {!popped ? (
          <motion.div
            key="b"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.2 }}
            className="relative size-full rounded-full"
            style={{ backdropFilter: filter, WebkitBackdropFilter: filter }}
          >
            {map && (
              <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
                <filter id={id} x="0" y="0" width={SIZE} height={SIZE} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feImage href={map} x="0" y="0" width={SIZE} height={SIZE} result="m" preserveAspectRatio="none" />
                  <feDisplacementMap in="SourceGraphic" in2="m" scale={SIZE * 0.42} xChannelSelector="R" yChannelSelector="G" result="dr" />
                  <feDisplacementMap in="SourceGraphic" in2="m" scale={SIZE * 0.41} xChannelSelector="R" yChannelSelector="G" result="dg" />
                  <feDisplacementMap in="SourceGraphic" in2="m" scale={SIZE * 0.4} xChannelSelector="R" yChannelSelector="G" result="db" />
                  <feColorMatrix in="dr" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
                  <feColorMatrix in="dg" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
                  <feColorMatrix in="db" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
                  <feBlend in="r" in2="g" mode="screen" result="rg" />
                  <feBlend in="rg" in2="b" mode="screen" />
                </filter>
              </svg>
            )}
            <div className="bubble-rim absolute inset-0 rounded-full" />
            <div className="bubble-glint" />
          </motion.div>
        ) : (
          <motion.div key="pop" className="absolute inset-0" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.45 }}>
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 size-1.5 rounded-full bg-[var(--accent)]"
                  initial={{ x: 0, y: 0, scale: 1 }}
                  animate={{ x: Math.cos(a) * 70, y: Math.sin(a) * 70, scale: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
