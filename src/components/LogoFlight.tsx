"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Logo } from "./Logo";

const SIZE = 30;
const FLY_MS = 3200; // bouncing around
const RETURN_MS = 1100; // limping home

/**
 * The logo breaks out of the header, ricochets off the edges of the screen,
 * runs out of steam, drifts back to where it started and catches its breath.
 */
export function LogoFlight({ from, onDone }: { from: DOMRect; onDone: () => void }) {
  const el = useRef<HTMLDivElement>(null);
  const tired = useAnimationControls();
  const [phase, setPhase] = useState<"fly" | "tired">("fly");

  useEffect(() => {
    const home = { x: from.left + from.width / 2 - SIZE / 2, y: from.top + from.height / 2 - SIZE / 2 };
    const s = { x: home.x, y: home.y, vx: 900 + Math.random() * 300, vy: 700 + Math.random() * 300, rot: 0, vr: 1400 };
    const start = performance.now();
    let prev = start;
    let raf = 0;
    let returnFrom: { x: number; y: number; rot: number; t: number } | null = null;

    const paint = (x: number, y: number, rot: number, scale = 1) => {
      if (el.current) el.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`;
    };

    const loop = (t: number) => {
      const dt = Math.min(0.033, (t - prev) / 1000);
      prev = t;
      const elapsed = t - start;

      if (elapsed < FLY_MS) {
        // Bounce off the viewport edges, losing a little energy each time.
        // Scaled up around its centre, so keep that much clear of each edge.
        const m = SIZE * 0.6;
        const W = window.innerWidth - SIZE - m;
        const H = window.innerHeight - SIZE - m;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.x < m || s.x > W) {
          s.x = Math.min(Math.max(s.x, m), W);
          s.vx *= -0.92;
          s.vr *= -0.9;
        }
        if (s.y < m || s.y > H) {
          s.y = Math.min(Math.max(s.y, m), H);
          s.vy *= -0.92;
          s.vr *= 0.9;
        }
        const drag = Math.pow(0.55, dt); // slowly running out of steam
        s.vx *= drag;
        s.vy *= drag;
        s.vr *= drag;
        s.rot += s.vr * dt;
        // A little squash on the way, faster = flatter.
        const speed = Math.hypot(s.vx, s.vy);
        paint(s.x, s.y, s.rot, 2.2 - Math.min(0.25, speed / 6000));
      } else if (elapsed < FLY_MS + RETURN_MS) {
        returnFrom ??= { x: s.x, y: s.y, rot: s.rot, t };
        const p = Math.min(1, (t - returnFrom.t) / RETURN_MS);
        const e = 1 - Math.pow(1 - p, 3);
        // Sagging arc home, shrinking back to header size.
        const sag = Math.sin(p * Math.PI) * 60;
        const x = returnFrom.x + (home.x - returnFrom.x) * e;
        const y = returnFrom.y + (home.y - returnFrom.y) * e + sag;
        const rot = returnFrom.rot + (Math.round(returnFrom.rot / 360) * 360 - returnFrom.rot) * e;
        paint(x, y, rot, 2.2 - 1.2 * e);
      } else {
        paint(home.x, home.y, 0, 1);
        setPhase("tired");
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [from]);

  // Out of breath: wobble, sag, heave a few times, then settle.
  useEffect(() => {
    if (phase !== "tired") return;
    let cancelled = false;
    (async () => {
      await tired.start({ rotate: [0, -18, 12, -7, 4, 0], transition: { duration: 0.9, ease: "easeOut" } });
      await tired.start({ scaleY: [1, 0.82, 1.04, 0.86, 1.02, 0.9, 1], scaleX: [1, 1.12, 0.98, 1.1, 1, 1.06, 1], y: [0, 2, 0, 2, 0, 1, 0], transition: { duration: 1.8, ease: "easeInOut" } });
      if (!cancelled) onDone();
    })();
    return () => {
      cancelled = true;
    };
  }, [phase, tired, onDone]);

  return createPortal(
    <div ref={el} className="pointer-events-none fixed left-0 top-0 z-[95]" style={{ width: SIZE, height: SIZE }} aria-hidden>
      <motion.div animate={tired} style={{ originY: 1 }}>
        <Logo size={SIZE} />
      </motion.div>
      <AnimatePresence>
        {phase === "tired" && (
          <>
            {["z", "z", "Z"].map((z, i) => (
              <motion.span
                key={i}
                className="mono absolute font-semibold text-[var(--accent-text)]"
                style={{ left: SIZE - 4 + i * 6, top: -4, fontSize: 10 + i * 3 }}
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ opacity: [0, 1, 1, 0], y: -26 - i * 8, x: 6 + i * 4 }}
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
    </div>,
    document.body,
  );
}
