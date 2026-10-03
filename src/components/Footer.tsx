import Link from "next/link";
import { site } from "@/content/site";
import { CopyEmail } from "./CopyEmail";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer className="relative mt-40 pb-32">
      <div className="shell">
        <Reveal>
          <p className="label">Next step</p>
          <Link href="/contact" className="group mt-6 block">
            <h2 className="text-[clamp(3.25rem,11vw,10rem)] font-medium leading-[0.88] tracking-[-0.05em]">
              Let&apos;s build
              <br />
              <span className="font-serif italic text-[var(--muted)] transition-colors duration-500 group-hover:text-[var(--fg)]">
                something good.
              </span>
            </h2>
          </Link>
        </Reveal>
        <div className="mt-14 flex flex-col gap-10 border-t hairline pt-8 md:flex-row md:items-end md:justify-between">
          <CopyEmail className="text-lg sm:text-xl" />
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-[var(--fg)]">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 flex justify-between">
          <span className="label">© {new Date().getFullYear()} {site.name}</span>
          <span className="label">Built by hand · Next.js</span>
        </div>
      </div>
    </footer>
  );
}
