"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.2, 0.7, 0.2, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {v.toLocaleString()}
      {suffix}
    </span>
  );
}
