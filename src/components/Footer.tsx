import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { CopyEmail } from "./CopyEmail";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="shell mt-16 pb-28">
      <div className="card grid gap-8 p-6 sm:p-10 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="label">~/contact</p>
          <h2 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Always happy to talk about software.
          </h2>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--fg)] px-5 text-sm font-medium text-[var(--bg)]">
              Get in touch <ArrowUpRight size={15} />
            </Link>
            <CopyEmail className="text-sm text-[var(--muted)]" />
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-sm">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl bg-[var(--surface-2)] px-4 py-3 transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]">
                {s.label}
                <ArrowUpRight size={14} className="opacity-60" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4 text-xs text-[var(--muted)]">
        <span className="flex items-center gap-2">
          <Logo size={16} /> © {new Date().getFullYear()} {site.name}
        </span>
        <span className="mono hidden sm:inline">Psst. Try ⌘K, or type &apos;help&apos; in the terminal.</span>
      </div>
    </footer>
  );
}
