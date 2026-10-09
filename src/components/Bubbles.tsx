"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { memo, useEffect, useRef, useState } from "react";
import { type Bubble, type Pop, pop, setGun, spawn, touch, useBubbleWorld, world } from "@/lib/bubbles";

const AMBIENT = 104;
const AMBIENT_PHONE = 64; // small enough not to hide a line of text
const DRIFT = 28; // px/s a bubble settles back to after a throw
const MIN_SPEED = 12;
const LENS_MAX = 6; // true refraction is expensive; only the biggest few get it
const GROW = 60; // radius px/s while blowing
const HOLD_MS = 160; // shorter than this is a tap: shoot a volley instead
const FILM = ["#ff8fc8", "#ffd27a", "#8fffd0", "#8cc4ff", "#c79bff"];

/**
 * Displacement map for a convex lens: every pixel samples from closer to the
 * centre (magnification), with extra bending toward the rim like real glass.
 */
const maps = new Map<number, string>();
function lensMap(size: number) {
  const hit = maps.get(size);
  if (hit) return hit;
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
  const url = c.toDataURL();
  maps.set(size, url);
  return url;
}

/** Lens filters come in fixed diameters, so finished bubbles snap to one of these. */
const lensSize = (r: number) => Math.max(32, Math.min(160, Math.round((2 * r) / 8) * 8));

function LensFilter({ d }: { d: number }) {
  return (
    <filter id={`bubble-lens-${d}`} x="0" y="0" width={d} height={d} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feImage href={lensMap(d)} x="0" y="0" width={d} height={d} result="m" preserveAspectRatio="none" />
      <feDisplacementMap in="SourceGraphic" in2="m" scale={d * 0.42} xChannelSelector="R" yChannelSelector="G" result="dr" />
      <feDisplacementMap in="SourceGraphic" in2="m" scale={d * 0.41} xChannelSelector="R" yChannelSelector="G" result="dg" />
      <feDisplacementMap in="SourceGraphic" in2="m" scale={d * 0.4} xChannelSelector="R" yChannelSelector="G" result="db" />
      <feColorMatrix in="dr" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
      <feColorMatrix in="dg" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
      <feColorMatrix in="db" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
      <feBlend in="r" in2="g" mode="screen" result="rg" />
      <feBlend in="rg" in2="b" mode="screen" />
    </filter>
  );
}

type Els = { outer: HTMLDivElement; inner: HTMLDivElement };

/* ---------- Physics ---------- */

function squash(b: Bubble, speed: number, angle: number) {
  const amt = Math.min(0.22, speed / 2200);
  if (amt > Math.abs(b.sq)) {
    b.sq = amt;
    b.sqV = 0;
    b.sqA = angle;
  }
}

function step(dt: number, now: number) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const bs = world.bubbles;
  const expired: Bubble[] = [];

  for (const b of bs) {
    if (now > b.dies && !b.held) expired.push(b);
    if (b.growing) b.r = Math.min(b.maxR, b.r + GROW * dt * (1 - (b.r / b.maxR) * 0.6));
    if (!b.held) {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      // Throws slow down until they settle back into a lazy drift.
      const sp = Math.hypot(b.vx, b.vy);
      if (sp > DRIFT) {
        const f = Math.max(DRIFT / sp, 1 - 1.6 * dt);
        b.vx *= f;
        b.vy *= f;
      } else if (sp < MIN_SPEED) {
        const a = sp < 0.01 ? Math.random() * Math.PI * 2 : Math.atan2(b.vy, b.vx);
        b.vx = Math.cos(a) * MIN_SPEED;
        b.vy = Math.sin(a) * MIN_SPEED;
      }
      // Air currents: the heading slowly meanders.
      const turn = 0.35 * dt * Math.sin(now / 1900 + b.phase);
      const c = Math.cos(turn);
      const s = Math.sin(turn);
      [b.vx, b.vy] = [b.vx * c - b.vy * s, b.vx * s + b.vy * c];

      if (b.x - b.r < 0 || b.x + b.r > W) {
        const left = b.x - b.r < 0;
        b.x = left ? b.r : W - b.r;
        if (left ? b.vx < 0 : b.vx > 0) {
          squash(b, Math.abs(b.vx), 0);
          b.vx = -b.vx * 0.88;
        }
      }
      if (b.y - b.r < 0 || b.y + b.r > H) {
        const top = b.y - b.r < 0;
        b.y = top ? b.r : H - b.r;
        if (top ? b.vy < 0 : b.vy > 0) {
          squash(b, Math.abs(b.vy), Math.PI / 2);
          b.vy = -b.vy * 0.88;
        }
      }
    }
    // Jelly: a damped spring pulls the squash back to round, overshooting a little.
    b.sqV += (-260 * b.sq - 9 * b.sqV) * dt;
    b.sq += b.sqV * dt;
  }

  // Bubbles bump into each other. Mass goes with area; a held bubble is an immovable pusher.
  for (let i = 0; i < bs.length; i++) {
    for (let j = i + 1; j < bs.length; j++) {
      const a = bs[i];
      const b = bs[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const min = a.r + b.r;
      const d2 = dx * dx + dy * dy;
      if (d2 >= min * min) continue;
      const ia = a.held ? 0 : 1 / (a.r * a.r);
      const ib = b.held ? 0 : 1 / (b.r * b.r);
      if (ia + ib === 0) continue;
      const d = Math.sqrt(d2) || 0.01;
      const nx = dx / d;
      const ny = dy / d;
      const overlap = min - d;
      a.x -= nx * overlap * (ia / (ia + ib));
      a.y -= ny * overlap * (ia / (ia + ib));
      b.x += nx * overlap * (ib / (ia + ib));
      b.y += ny * overlap * (ib / (ia + ib));
      const vn = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
      if (vn < 0) {
        const jn = (-(1 + 0.86) * vn) / (ia + ib);
        a.vx -= jn * ia * nx;
        a.vy -= jn * ia * ny;
        b.vx += jn * ib * nx;
        b.vy += jn * ib * ny;
        const angle = Math.atan2(ny, nx);
        squash(a, -vn * 1.3, angle);
        squash(b, -vn * 1.3, angle);
      }
    }
  }

  // The flying logo bursts anything it touches.
  const L = world.logo;
  if (L) for (const b of [...bs]) if (Math.hypot(b.x - L.x, b.y - L.y) < b.r + L.r * 0.8) pop(b, "logo");

  for (const b of expired) pop(b, "age");
}

function paint(els: Map<number, Els>, now: number) {
  for (const b of world.bubbles) {
    const e = els.get(b.id);
    if (!e) continue;
    const d = Math.round(2 * b.r);
    if (e.outer.dataset.d !== String(d)) {
      e.outer.style.width = e.outer.style.height = `${d}px`;
      e.outer.dataset.d = String(d);
    }
    e.outer.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`;
    const a = (b.sqA * 180) / Math.PI;
    // A slow idle breathe on its own axis, on top of any hit wobble.
    const idle = 0.016 * Math.sin(now / 460 + b.phase);
    const ia = (b.phase * 180) / Math.PI;
    e.inner.style.transform =
      `rotate(${a}deg) scale(${1 - b.sq}, ${1 + b.sq}) rotate(${-a}deg) ` + `rotate(${ia}deg) scale(${1 + idle}, ${1 - idle}) rotate(${-ia}deg)`;
  }
}

/* ---------- One bubble ---------- */

const BubbleView = memo(function BubbleView({ b, lens, frosted, register }: { b: Bubble; lens: number | null; frosted: boolean; register: (id: number, e: Els | null) => void }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const g = useRef({ lastX: 0, lastY: 0, lastT: 0, downX: 0, downY: 0, lastTap: 0 });

  useEffect(() => {
    if (outer.current && inner.current) register(b.id, { outer: outer.current, inner: inner.current });
    return () => register(b.id, null);
  }, [b.id, register]);

  const onDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    const s = g.current;
    b.held = true;
    s.lastX = s.downX = e.clientX;
    s.lastY = s.downY = e.clientY;
    s.lastT = performance.now();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!b.held || b.growing) return;
    const s = g.current;
    const now = performance.now();
    const dt = Math.max(1, now - s.lastT) / 1000;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    b.x += dx;
    b.y += dy;
    b.vx = dx / dt;
    b.vy = dy / dt;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.lastT = now;
  };
  const onUp = (e: React.PointerEvent) => {
    if (b.growing) return;
    const s = g.current;
    b.held = false;
    // Touchscreens never fire dblclick, so count two quick taps as one.
    if (e.pointerType !== "mouse" && Math.hypot(e.clientX - s.downX, e.clientY - s.downY) < 10) {
      const now = performance.now();
      if (now - s.lastTap < 350) return pop(b, "user");
      s.lastTap = now;
    }
    // A pointer that stopped before letting go isn't a throw.
    if (performance.now() - s.lastT > 80) b.vx = b.vy = 0;
    const speed = Math.hypot(b.vx, b.vy);
    if (speed > 1800) {
      b.vx *= 1800 / speed;
      b.vy *= 1800 / speed;
    }
  };

  const filter = lens ? `blur(0.4px) url(#bubble-lens-${lens}) saturate(130%)` : frosted ? "blur(2px) saturate(150%)" : undefined;

  return (
    <div
      ref={outer}
      className="bubble fixed left-0 top-0 z-[45] cursor-grab touch-none select-none active:cursor-grabbing print:hidden"
      style={{ width: b.r * 2, height: b.r * 2, transform: `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)` }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onDoubleClick={() => pop(b, "user")}
      role="presentation"
      title="Drag me. Double-click (or double-tap) to pop."
    >
      <div className="bubble-in size-full">
        <div ref={inner} className="relative size-full rounded-full" style={{ backdropFilter: filter, WebkitBackdropFilter: filter }}>
          <div className="bubble-film" style={{ animationDelay: `${-b.phase * 2}s` }} />
          <div className="bubble-rim absolute inset-0 rounded-full" />
          <div className="bubble-glint" />
          <div className="bubble-glint-2" />
        </div>
      </div>
    </div>
  );
});

/* ---------- Popping ---------- */

function Burst({ p }: { p: Pop }) {
  const loud = p.by === "user" || p.by === "logo";
  const n = p.r > 30 ? 12 : 8;
  return (
    <div className="pointer-events-none fixed z-[46]" style={{ left: p.x, top: p.y }} aria-hidden>
      <motion.span
        className="bubble-burst-ring absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        initial={{ width: p.r * 2, height: p.r * 2, opacity: 0.9 }}
        animate={{ width: p.r * 2.9, height: p.r * 2.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      {Array.from({ length: n }).map((_, i) => {
        const a = (i / n) * Math.PI * 2 + p.id;
        const dist = p.r * (loud ? 1.15 : 0.8) + (i % 3) * 8;
        const size = i % 3 === 0 ? 5 : 3;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, background: FILM[i % FILM.length] }}
            initial={{ x: Math.cos(a) * p.r * 0.85, y: Math.sin(a) * p.r * 0.85, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(a) * dist, y: Math.sin(a) * dist + 14, opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.55, ease: [0.15, 0.7, 0.3, 1] }}
          />
        );
      })}
    </div>
  );
}

/* ---------- The gun ---------- */

function BubbleGun() {
  const cursor = useRef<HTMLDivElement | null>(null);
  const last = useRef({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  // The wand mounts on the first mouse move, so place it where that move was.
  const placeCursor = (el: HTMLDivElement | null) => {
    cursor.current = el;
    if (el) el.style.transform = `translate3d(${last.current.x}px, ${last.current.y}px, 0)`;
  };
  const g = useRef<{ x: number; y: number; vx: number; vy: number; t: number; down: number; timer: number; b: Bubble | null } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setGun(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const phone = () => window.innerWidth < 640;

  const volley = (x: number, y: number) => {
    const now = performance.now();
    for (let i = 0; i < 3; i++) {
      const a = -Math.PI / 2 + (i - 1) * 0.42 + (Math.random() - 0.5) * 0.25;
      const v = 300 + Math.random() * 220;
      const r = [16, 20, 24][Math.floor(Math.random() * 3)] * (phone() ? 0.75 : 1);
      spawn({ x: x + Math.cos(a) * 10, y: y + Math.sin(a) * 10, r: lensSize(r) / 2, vx: Math.cos(a) * v, vy: Math.sin(a) * v, dies: now + 18000 + Math.random() * 14000 });
    }
  };

  const onDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const s = { x: e.clientX, y: e.clientY, vx: 0, vy: 0, t: performance.now(), down: performance.now(), timer: 0, b: null as Bubble | null };
    // Held long enough: start blowing a bubble right at the wand.
    s.timer = window.setTimeout(() => {
      const maxR = (36 + Math.random() * 30) * (phone() ? 0.65 : 1);
      s.b = spawn({ x: s.x, y: s.y, r: 8, maxR, held: true, growing: true });
    }, HOLD_MS);
    g.current = s;
  };

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      last.current = { x: e.clientX, y: e.clientY };
      if (!showCursor) setShowCursor(true);
      if (cursor.current) cursor.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }
    const s = g.current;
    if (!s) return;
    const now = performance.now();
    const dt = Math.max(1, now - s.t) / 1000;
    // Smoothed pointer velocity, so a flick launches where you meant.
    s.vx = s.vx * 0.5 + ((e.clientX - s.x) / dt) * 0.5;
    s.vy = s.vy * 0.5 + ((e.clientY - s.y) / dt) * 0.5;
    s.x = e.clientX;
    s.y = e.clientY;
    s.t = now;
    if (s.b) {
      s.b.x = s.x;
      s.b.y = s.y;
      s.b.vx = s.vx;
      s.b.vy = s.vy;
    }
  };

  const onUp = () => {
    const s = g.current;
    g.current = null;
    if (!s) return;
    clearTimeout(s.timer);
    if (!s.b) return volley(s.x, s.y);
    const b = s.b;
    b.held = false;
    b.growing = false;
    b.r = lensSize(b.r) / 2;
    b.dies = performance.now() + 30000 + Math.random() * 20000;
    const still = performance.now() - s.t > 80;
    let vx = still ? 0 : s.vx;
    let vy = still ? 0 : s.vy;
    const sp = Math.hypot(vx, vy);
    if (sp > 1400) {
      vx *= 1400 / sp;
      vy *= 1400 / sp;
    } else if (sp < 80) {
      // Let go without a flick: it floats up and away.
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
      vx = Math.cos(a) * 90;
      vy = Math.sin(a) * 90;
    }
    b.vx = vx;
    b.vy = vy;
    squash(b, 900, Math.atan2(vy, vx));
    touch();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[39] touch-none select-none print:hidden"
        style={{ cursor: showCursor ? "none" : "crosshair" }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={() => setShowCursor(false)}
        aria-hidden
      />
      {showCursor && (
        <div ref={placeCursor} className="pointer-events-none fixed left-0 top-0 z-[47]" aria-hidden>
          <span className="bubble-wand absolute -left-[13px] -top-[13px] size-[26px] rounded-full" />
          <span className="absolute left-[8px] top-[8px] h-[18px] w-[3px] origin-top -rotate-45 rounded-full bg-[var(--muted)]" />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: -10, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: -10, x: "-50%" }}
        // .glass sets position: relative, so pin it here.
        style={{ position: "fixed" }}
        className="glass left-1/2 top-[72px] z-[46] flex items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-3.5 pr-1.5 text-[13px] print:hidden"
      >
        <span className="bubble-wand size-3.5 rounded-full" aria-hidden />
        <span>
          <span className="font-medium">Bubble gun</span>
          <span className="text-[var(--muted)]">
            <span className="hidden sm:inline"> · tap to shoot, hold to blow, flick to throw</span>
            <span className="sm:hidden"> · tap or hold</span>
          </span>
        </span>
        <button onClick={() => setGun(false)} className="grid size-7 place-items-center rounded-full text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--fg)]" aria-label="Put the bubble gun away (Esc)" title="Esc">
          <X size={14} />
        </button>
      </motion.div>
    </>
  );
}

/* ---------- The world ---------- */

/**
 * Liquid-glass soap bubbles over the whole page. One drifts in on its own;
 * the bubble gun makes more. They bump into each other, can be grabbed and
 * thrown, pop on double-click, and burst when the runaway logo hits them.
 * Chromium gets true refraction; other browsers get frosted glass.
 */
export function Bubbles() {
  const pathname = usePathname();
  useBubbleWorld();
  const els = useRef(new Map<number, Els>());
  const [chromium, setChromium] = useState(false);
  const off = pathname.startsWith("/admin") || pathname === "/testimonials/new";

  const register = useRef((id: number, e: Els | null) => {
    if (e) els.current.set(id, e);
    else els.current.delete(id);
  }).current;

  // The ambient bubble, once per visit unless it was popped this session.
  useEffect(() => {
    const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands;
    setChromium(!!brands?.some((b) => b.brand === "Chromium"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem("kalx:popped")) return;
    } catch {}
    const t = setTimeout(() => {
      const r = (window.innerWidth < 640 ? AMBIENT_PHONE : AMBIENT) / 2;
      const a = Math.random() * Math.PI * 2;
      spawn({ x: window.innerWidth * 0.62 + r, y: window.innerHeight * 0.32 + r, r, vx: Math.cos(a) * DRIFT, vy: Math.sin(a) * DRIFT, ambient: true });
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (off) setGun(false);
  }, [off]);

  useEffect(() => {
    if (off) return;
    let raf = 0;
    let prev = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(0.033, (t - prev) / 1000);
      prev = t;
      if (world.bubbles.length) {
        step(dt, t);
        paint(els.current, t);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [off]);

  if (off) return null;

  const settled = world.bubbles.filter((b) => !b.growing);
  const lens = new Map<number, number>();
  if (chromium) for (const b of [...settled].sort((x, y) => y.r - x.r).slice(0, LENS_MAX)) lens.set(b.id, lensSize(b.r));

  return (
    <>
      {lens.size > 0 && (
        <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
          {[...new Set(lens.values())].map((d) => (
            <LensFilter key={d} d={d} />
          ))}
        </svg>
      )}
      {world.bubbles.map((b) => (
        <BubbleView key={b.id} b={b} lens={lens.get(b.id) ?? null} frosted={!chromium && b.r >= 24} register={register} />
      ))}
      {world.pops.map((p) => (
        <Burst key={p.id} p={p} />
      ))}
      <AnimatePresence>{world.gun && <BubbleGun key="gun" />}</AnimatePresence>
    </>
  );
}
