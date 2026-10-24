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
        <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-[1] tracking-[-0.045em]">What people say</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--muted)]">Written by people I&apos;ve worked with, in their own words.</p>
      </Reveal>
      {items.length === 0 ? (
        <div className="card p-10 text-center text-[var(--muted)]">Nothing here yet. Check back soon.</div>
      ) : (
        <>
          <Reveal>
            <TestimonialCard featured t={{ ...items[0], avatarSrc: items[0].hasAvatar ? `/api/testimonials/${items[0].id}/avatar` : null }} />
          </Reveal>
          {items.length > 1 && (
            <div className="mt-3 columns-1 gap-3 md:columns-2 [&>*]:mb-3">
              {items.slice(1).map((t, i) => (
                <Reveal key={t.id} delay={(i % 2) * 0.06} className="break-inside-avoid">
                  <TestimonialCard t={{ ...t, avatarSrc: t.hasAvatar ? `/api/testimonials/${t.id}/avatar` : null }} />
                </Reveal>
              ))}
            </div>
          )}
        </>
      )}
      <Link href="/testimonials/new" className="mono mt-6 inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--fg)]">
        Worked with me? Leave a testimonial <ArrowUpRight size={14} />
      </Link>
    </section>
  );
}
