"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Logo } from "./Logo";
import { world } from "@/lib/bubbles";

const SIZE = 30;
const SCALE = 2.2; // how big it gets while loose
const RETURN_MS = 3000;

const LINES = ["okay… okay, I'm coming", "who put walls everywhere?", "I can taste colours", "never. again.", "worth it.", "is the room still spinning?", "my blades are in the wrong order", "I'm fine. totally fine."];
const BIG_LINES = (n: number) => [`${n} clicks?! really?`, "I think I saw my code compile", "I left a blade somewhere back there", `${n} clicks. I'm telling HR.`];
const BONKS = ["bonk", "ow", "oof", "wheee", "boing"];
const POPS = ["pop!", "pop!", "plip", "splash", "gotcha"];

type Impact = { id: number; x: number; y: number; word?: string; side: "x" | "y" | "bubble"; r?: number };

function pick<T>(arr: T[], n: number) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

/**
 * The logo breaks out of the header with all the momentum it was given,
 * ricochets off the screen edges with a bit of spin physics, runs out of
 * steam, wanders home muttering, and catches its breath.
 *
 * `charge` is how many times it was clicked; `spin` is its spin speed
 * (deg/s) at launch.
 */
export function LogoFlight({ from, charge, spin, onDone }: { from: DOMRect; charge: number; spin: number; onDone: () => void }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const tired = useAnimationControls();
  const [phase, setPhase] = useState<"fly" | "return" | "tired">("fly");
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [line, setLine] = useState<string | null>(null);

  // Lines to mutter on the way home: wilder the harder it was launched.
  const lines = useRef(charge >= 12 ? [...pick(BIG_LINES(charge), 1), ...pick(LINES, 1)] : pick(LINES, 2));

  useEffect(() => {
    const c = Math.min(charge, 40);
    const home = { x: from.left + from.width / 2 - SIZE / 2, y: from.top + from.height / 2 - SIZE / 2 };
    // More clicks: faster launch, longer flight.
    const speed = Math.min(1500 + c * 140, 5200);
    const flyMs = Math.min(2600 + c * 380, 12000);
    const angle = Math.PI * (0.15 + Math.random() * 0.7); // somewhere downward, away from the header
    const s = {
      x: home.x,
      y: home.y,
      vx: Math.cos(angle) * speed * (Math.random() < 0.5 ? -1 : 1),
      vy: Math.sin(angle) * speed,
      rot: 0,
      vr: Math.max(spin, 720) * (1 + c / 10),
    };
    // Drag tuned so it's crawling (~180px/s) right when the flight ends.
    const decay = Math.log(180 / speed) / (flyMs / 1000);
    const start = performance.now();
    let prev = start;
    let raf = 0;
    let impactId = 0;
    let lastImpact = 0;
    let back: { x: number; y: number; rot: number; t: number } | null = null;

    const paint = (x: number, y: number, rot: number, scale: number, squash = 1) => {
      // Tell the bubbles where we are, so we burst any we fly through.
      world.logo = { x: x + SIZE / 2, y: y + SIZE / 2, r: (SIZE * scale) / 2 };
      if (outer.current) outer.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (inner.current) inner.current.style.transform = `rotate(${rot}deg) scale(${scale * squash}, ${scale / squash})`;
    };

    const impact = (x: number, y: number, side: "x" | "y", v: number) => {
      const now = performance.now();
      if (v < 700 || now - lastImpact < 90) return;
      lastImpact = now;
      const id = ++impactId;
      const word = v > 1600 && Math.random() < 0.35 ? BONKS[Math.floor(Math.random() * BONKS.length)] : undefined;
      setImpacts((list) => [...list.slice(-6), { id, x, y, word, side }]);
      setTimeout(() => setImpacts((list) => list.filter((i) => i.id !== id)), 700);
    };

    // Bursting a bubble costs a little momentum and adds a little spin.
    world.onLogoHit = (b) => {
      const id = ++impactId;
      setImpacts((list) => [...list.slice(-6), { id, x: b.x, y: b.y, word: POPS[Math.floor(Math.random() * POPS.length)], side: "bubble", r: b.r }]);
      setTimeout(() => setImpacts((list) => list.filter((i) => i.id !== id)), 700);
      s.vx *= 0.93;
      s.vy *= 0.93;
      s.vr *= 1.12;
    };

    const loop = (t: number) => {
      const dt = Math.min(0.025, (t - prev) / 1000);
      prev = t;
      const elapsed = t - start;

      if (elapsed < flyMs) {
        const m = SIZE * (SCALE - 1) * 0.5 + 4;
        const W = window.innerWidth - SIZE - m;
        const H = window.innerHeight - SIZE - m;
        const r = (SIZE * SCALE) / 2;

        // Sub-step so fast throws never tunnel through an edge.
        const steps = Math.ceil((Math.hypot(s.vx, s.vy) * dt) / 12) || 1;
        const h = dt / steps;
        let squash = 1;
        for (let i = 0; i < steps; i++) {
          s.x += s.vx * h;
          s.y += s.vy * h;
          if (s.x < m || s.x > W) {
            const hitLeft = s.x < m;
            s.x = hitLeft ? m : W;
            const e = 0.82 + Math.random() * 0.15; // every wall is a little different
            const vt = s.vy; // velocity along the wall
            // Spin grips the wall: some spin turns into sideways speed and back.
            const surface = (s.vr * Math.PI) / 180 * r * (hitLeft ? -1 : 1);
            s.vy = vt * 0.85 + surface * 0.12 + (Math.random() - 0.5) * 220;
            s.vr = s.vr * 0.75 + ((vt * (hitLeft ? 1 : -1)) / r) * (180 / Math.PI) * 0.18;
            impact(hitLeft ? 0 : window.innerWidth, s.y + SIZE / 2, "x", Math.abs(s.vx));
            s.vx = -s.vx * e;
            squash = 0.7;
          }
          if (s.y < m || s.y > H) {
            const hitTop = s.y < m;
            s.y = hitTop ? m : H;
            const e = 0.82 + Math.random() * 0.15;
            const vt = s.vx;
            const surface = (s.vr * Math.PI) / 180 * r * (hitTop ? 1 : -1);
            s.vx = vt * 0.85 + surface * 0.12 + (Math.random() - 0.5) * 220;
            s.vr = s.vr * 0.75 + ((vt * (hitTop ? -1 : 1)) / r) * (180 / Math.PI) * 0.18;
            impact(s.x + SIZE / 2, hitTop ? 0 : window.innerHeight, "y", Math.abs(s.vy));
            s.vy = -s.vy * e;
            squash = 1.35;
          }
        }
        // Keep it from ever going too fast after spin kicks.
        const v = Math.hypot(s.vx, s.vy);
        if (v > speed * 1.1) {
          s.vx *= (speed * 1.1) / v;
          s.vy *= (speed * 1.1) / v;
        }
        const k = Math.exp(decay * dt);
        s.vx *= k;
        s.vy *= k;
        s.vr *= Math.exp(decay * 0.8 * dt);
        s.rot += s.vr * dt;
        paint(s.x, s.y, s.rot, SCALE, squash);
      } else if (elapsed < flyMs + RETURN_MS) {
        if (!back) {
          back = { x: s.x, y: s.y, rot: s.rot, t };
          setPhase("return");
        }
        const p = Math.min(1, (t - back.t) / RETURN_MS);
        const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        // A tipsy, wandering walk home.
        const wobble = Math.sin(p * Math.PI * 5) * 26 * (1 - p);
        const sag = Math.sin(p * Math.PI) * 50;
        const x = back.x + (home.x - back.x) * e + wobble;
        const y = back.y + (home.y - back.y) * e + sag;
        const target = Math.round(back.rot / 360) * 360;
        const rot = back.rot + (target - back.rot) * e + Math.sin(p * Math.PI * 6) * 14 * (1 - p);
        paint(x, y, rot, SCALE - (SCALE - 1) * e);
      } else {
        paint(home.x, home.y, 0, 1);
        world.logo = null;
        setPhase("tired");
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      world.logo = null;
      world.onLogoHit = null;
    };
  }, [from, charge, spin]);

  // Mutter a line or two on the way home.
  useEffect(() => {
    if (phase !== "return") return;
    const [a, b] = lines.current;
    setLine(a);
    const t1 = setTimeout(() => setLine(b ?? null), RETURN_MS / 2);
    const t2 = setTimeout(() => setLine(null), RETURN_MS - 150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);

  // Out of breath: wobble, sag, heave a few times, then settle.
  useEffect(() => {
    if (phase !== "tired") return;
    let cancelled = false;
    (async () => {
      await tired.start({ rotate: [0, -18, 12, -7, 4, 0], transition: { duration: 0.9, ease: "easeOut" } });
      await tired.start({
        scaleY: [1, 0.82, 1.04, 0.86, 1.02, 0.9, 1],
        scaleX: [1, 1.12, 0.98, 1.1, 1, 1.06, 1],
        y: [0, 2, 0, 2, 0, 1, 0],
        transition: { duration: 1.8, ease: "easeInOut" },
      });
      if (!cancelled) onDone();
    })();
    return () => {
      cancelled = true;
    };
  }, [phase, tired, onDone]);

  return createPortal(
    <>
      {/* Impact rings where it hits an edge */}
      {impacts.map((i) => (
        <div key={i.id} className="pointer-events-none fixed z-[94]" style={{ left: i.x, top: i.y }} aria-hidden>
          {i.side !== "bubble" && (
            <motion.span
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--accent)]"
              initial={{ width: 8, height: 8, opacity: 0.9 }}
              animate={{ width: 70, height: 70, opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
          )}
          {i.word && (
            <motion.span
              className="mono absolute whitespace-nowrap text-xs font-semibold text-[var(--accent-text)]"
              style={
                i.side === "bubble"
                  ? { left: -16, top: -(i.r ?? 20) - 18 }
                  : {
                      left: i.side === "x" ? (i.x < 50 ? 14 : -50) : -14,
                      top: i.side === "y" ? (i.y < 50 ? 12 : -28) : -8,
                    }
              }
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1.1, 1], y: -10 }}
              transition={{ duration: 0.7 }}
            >
              {i.word}
            </motion.span>
          )}
        </div>
      ))}

      <div ref={outer} className="pointer-events-none fixed left-0 top-0 z-[95]" style={{ width: SIZE, height: SIZE }} aria-hidden>
        <div ref={inner} style={{ width: SIZE, height: SIZE }}>
          <motion.div animate={tired} style={{ originY: 1 }}>
            <Logo size={SIZE} />
          </motion.div>
        </div>

        {/* Speech bubble while it wanders home */}
        <AnimatePresence mode="wait">
          {line && (
            <motion.div
              key={line}
              className="glass absolute left-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-[12px]"
              style={{ position: "absolute", bottom: SIZE * 1.6 }}
              initial={{ opacity: 0, y: 6, scale: 0.9, x: "-50%" }}
              animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, y: -4, scale: 0.95, x: "-50%" }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
            >
              {line}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "tired" && (
            <>
              {["z", "z", "Z"].map((z, i) => (
                <motion.span
                  key={i}
                  className="mono absolute font-semibold text-[var(--accent-text)]"
                  style={{ left: SIZE - 8 + i * 5, top: -6, fontSize: 10 + i * 3 }}
                  initial={{ opacity: 0, y: 0, x: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], y: -26 - i * 8, x: 4 + i * 3 }}
                  transition={{ duration: 1.6, delay: 0.6 + i * 0.35, ease: "easeOut" }}
                >
                  {z}
                </motion.span>
              ))}
              <motion.span
                className="mono absolute whitespace-nowrap text-[11px] text-[var(--muted)]"
                style={{ left: -6, top: SIZE + 6 }}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: [0, 1, 1, 0], x: 0 }}
                transition={{ duration: 2.4, delay: 0.3 }}
              >
                phew…
              </motion.span>
            </>
          )}
        </AnimatePresence>
      </div>
    </>,
    document.body,
  );
}
