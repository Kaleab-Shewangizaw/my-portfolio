import Link from "next/link";
import { site } from "@/content/site";
import { LocalTime } from "./LocalTime";

export function TopBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="shell flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name}, home`}>
          <span className="grid size-8 place-items-center rounded-full bg-[var(--fg)] font-serif text-lg italic text-[var(--bg)] transition-transform duration-500 group-hover:rotate-[-12deg]">
            K
          </span>
          <span className="text-sm font-medium tracking-tight">{site.alias}</span>
        </Link>
        <div className="flex items-center gap-5">
          <LocalTime className="label hidden sm:inline" />
          {site.available && (
            <span className="flex items-center gap-2 text-[13px] text-[var(--muted)]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Available
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
