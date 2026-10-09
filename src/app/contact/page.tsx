import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/CopyEmail";
import { LocalTime } from "@/components/LocalTime";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <section className="shell pt-24 lg:pt-28">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr] lg:items-start">
        <Reveal className="card p-6 sm:p-8">
          <p className="label">~/contact</p>
          <h1 className="mt-3 text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-[1] tracking-[-0.045em]">Say hello</h1>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-[var(--muted)]">
            Questions about something I built, an interesting problem, or just want to talk code? Send me a message.
          </p>
          <CopyEmail className="mt-6 text-lg" />
          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-[var(--line)] pt-6">
            <div>
              <dt className="label">Local time</dt>
              <dd className="mt-2 text-[15px]"><LocalTime /></dd>
            </div>
            <div>
              <dt className="label">Currently</dt>
              <dd className="mt-2 text-[15px]">{site.current}</dd>
            </div>
          </dl>
          <ul className="mt-8 border-t border-[var(--line)]">
            {site.socials.map((s) => (
              <li key={s.label} className="border-b border-[var(--line)] last:border-0">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-4">
                  <span className="font-medium">{s.label}</span>
                  <span className="flex items-center gap-3 text-sm text-[var(--muted)] group-hover:text-[var(--fg)]">
                    {s.handle}
                    <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="lg:sticky lg:top-6">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
