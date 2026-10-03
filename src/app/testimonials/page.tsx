import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getApproved } from "@/lib/testimonials";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients and colleagues say about working with Kaleab.",
};

export const revalidate = 3600;

export default async function TestimonialsPage() {
  const items = await getApproved();
  return (
    <section className="shell pt-24 lg:pt-28">
      <Reveal className="mb-8 max-w-2xl">
        <p className="label">~/testimonials</p>
        <h1 className="mt-3 text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-[1] tracking-[-0.045em]">Kind words</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--muted)]">From the people I&apos;ve built things with. Every one was written by them, in their own words.</p>
      </Reveal>
      {items.length === 0 ? (
        <div className="card p-10 text-center text-[var(--muted)]">Nothing here yet. Check back soon.</div>
      ) : (
        <div className="columns-1 gap-3 md:columns-2 lg:columns-3 [&>*]:mb-3">
          {items.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.06} className="break-inside-avoid">
              <TestimonialCard t={{ ...t, avatarSrc: t.hasAvatar ? `/api/testimonials/${t.id}/avatar` : null }} />
            </Reveal>
          ))}
        </div>
      )}
      <Link href="/testimonials/new" className="mono mt-6 inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--fg)]">
        Worked with me? Leave a testimonial <ArrowUpRight size={14} />
      </Link>
    </section>
  );
}
