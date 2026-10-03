"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ZOOM = 1.5;

/**
 * Renders `children` normally, plus a glass lens that drifts across them and
 * magnifies whatever is underneath. The magnified view is a scaled clone of
 * the same markup, so it works in every browser (no backdrop tricks needed).
 */
export function HeroLens({ children, clone }: { children: React.ReactNode; clone?: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [radius, setRadius] = useState(100);
  const hovering = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cx = useSpring(x, { stiffness: 110, damping: 18, mass: 0.7 });
  const cy = useSpring(y, { stiffness: 110, damping: 18, mass: 0.7 });

  const lensX = useTransform(cx, (v) => v - radius);
  const lensY = useTransform(cy, (v) => v - radius);
  const cloneTransform = useTransform(
    [cx, cy] as const,
    ([vx, vy]: number[]) => `translate(${radius - vx * ZOOM}px, ${radius - vy * ZOOM}px) scale(${ZOOM})`,
  );

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.offsetWidth, h: el.offsetHeight });
      setRadius(el.offsetWidth < 640 ? 52 : 82);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Idle drift along a slow Lissajous path until the visitor takes over.
  useEffect(() => {
    if (!size.w) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    const loop = (t: number) => {
      if (!hovering.current) {
        const s = reduce ? 0 : (t - start) / 1000;
        x.set(size.w * (0.5 + 0.36 * Math.sin(s * 0.33)));
        y.set(size.h * (0.5 + 0.3 * Math.sin(s * 0.51 + 1.2)));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [size, x, y]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = box.current!.getBoundingClientRect();
    hovering.current = true;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <div
      ref={box}
      className="relative"
      onPointerMove={onMove}
      onPointerLeave={() => (hovering.current = false)}
    >
      {children}
      {size.w > 0 && (
        <motion.div
          aria-hidden
          className="lens pointer-events-none absolute left-0 top-0 overflow-hidden rounded-full"
          style={{ x: lensX, y: lensY, width: radius * 2, height: radius * 2 }}
        >
          <motion.div
            className="absolute left-0 top-0 origin-top-left"
            style={{ width: size.w, transform: cloneTransform }}
          >
            {clone ?? children}
          </motion.div>
          <div className="lens-rim absolute inset-0 rounded-full" />
          <div className="lens-glint" />
        </motion.div>
      )}
    </div>
  );
}
