"use client";

import { motion } from "framer-motion";

// The Kal_X mark: three blades on a circle, one in ember.
const BLADE = "M50,14 A36,36 0 0 1 86,50 C78,34 66,24 50,14 Z";
const blades = [
  { rotate: 0, fill: "var(--accent)" },
  { rotate: 120, fill: "var(--fg)" },
  { rotate: 240, fill: "var(--fg)" },
];

export function Logo({
  size = 32,
  intro = false,
  spin = 0,
  className,
}: {
  size?: number;
  /** Blades fly in and lock together on mount. */
  intro?: boolean;
  /** Extra rotation in degrees, animated with a spring. */
  spin?: number;
  className?: string;
}) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden
      animate={{ rotate: spin }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      {blades.map((b, i) => (
        <g
          key={i}
          className={intro ? "blade blade-intro" : "blade"}
          style={{ "--r": `${b.rotate}deg`, animationDelay: `${0.1 + i * 0.12}s` } as React.CSSProperties}
        >
          <path d={BLADE} fill={b.fill} />
        </g>
      ))}
    </motion.svg>
  );
}
