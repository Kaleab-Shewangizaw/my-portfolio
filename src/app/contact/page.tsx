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
    <section className="shell pt-40">
      <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <Reveal>
          <p className="label">Contact</p>
          <h1 className="mt-6 text-[clamp(3.5rem,10vw,8.5rem)] font-medium leading-[0.88] tracking-[-0.055em]">
            Say <span className="font-serif italic">hello.</span>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-[var(--muted)]">
            Hiring, building something ambitious, or just curious? I reply to every message, usually within a day.
          </p>
          <CopyEmail className="mt-10 text-xl sm:text-2xl" />
          <dl className="mt-14 grid grid-cols-2 gap-8 border-t hairline pt-8">
            <div>
              <dt className="label">Local time</dt>
              <dd className="mt-2 text-[15px]"><LocalTime /></dd>
            </div>
            <div>
              <dt className="label">Status</dt>
              <dd className="mt-2 text-[15px]">{site.availability}</dd>
            </div>
          </dl>
          <ul className="mt-12 border-t hairline">
            {site.socials.map((s) => (
              <li key={s.label} className="border-b hairline">
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
        <Reveal delay={0.15} className="lg:sticky lg:top-28">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
