import { Activity, Database, GitMerge, Network, type LucideIcon } from "lucide-react";
import {
  siCplusplus, siDart, siDocker, siExpo, siExpress, siFlutter, siFramer, siGithubactions, siJavascript, siLinux,
  siMongodb, siNextdotjs, siNginx, siNodedotjs, siPm2, siPostgresql, siReact, siRust, siSocketdotio, siTailwindcss,
  siTypescript, siVercel, type SimpleIcon,
} from "simple-icons";

const brands: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Rust: siRust,
  Dart: siDart,
  "C++": siCplusplus,
  React: siReact,
  "Next.js": siNextdotjs,
  Tailwind: siTailwindcss,
  "Framer Motion": siFramer,
  "React Native": siReact,
  Expo: siExpo,
  Flutter: siFlutter,
  "Node.js": siNodedotjs,
  Express: siExpress,
  MongoDB: siMongodb,
  PostgreSQL: siPostgresql,
  "Socket.IO": siSocketdotio,
  Linux: siLinux,
  Nginx: siNginx,
  Docker: siDocker,
  PM2: siPm2,
  "GitHub Actions": siGithubactions,
  Vercel: siVercel,
};

// Tools without a brand mark get a plain icon in the text colour.
const generic: Record<string, LucideIcon> = {
  SQL: Database,
  REST: Network,
  "CI/CD": GitMerge,
  Reanimated: Activity,
};

/** Near-black brand colours (Next.js, Vercel, Rust…) would vanish on the dark theme, so they follow the text colour. */
function brandColor(hex: string) {
  const lin = (i: number) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * lin(0) + 0.7152 * lin(2) + 0.0722 * lin(4);
  return luminance < 0.04 ? "currentColor" : `#${hex}`;
}

export function ToolChip({ name }: { name: string }) {
  const brand = brands[name];
  const Generic = generic[name];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--surface-2)] px-2 py-1 text-[13px]">
      {brand ? (
        <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" fill={brandColor(brand.hex)} aria-hidden>
          <path d={brand.path} />
        </svg>
      ) : Generic ? (
        <Generic size={14} className="shrink-0 text-[var(--muted)]" aria-hidden />
      ) : null}
      {name}
    </span>
  );
}
