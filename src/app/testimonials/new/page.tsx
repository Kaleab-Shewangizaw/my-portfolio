import type { Metadata } from "next";
import { TestimonialForm } from "@/components/testimonials/TestimonialForm";

export const metadata: Metadata = {
  title: "Leave a testimonial",
  description: "Worked with Kaleab? Share a few words about it.",
  openGraph: { title: "Leave a testimonial for Kaleab", description: "Worked with Kaleab? Share a few words about it." },
  twitter: { title: "Leave a testimonial for Kaleab", description: "Worked with Kaleab? Share a few words about it." },
  robots: { index: false, follow: false },
};

export default async function NewTestimonial({ searchParams }: { searchParams: Promise<{ company?: string; project?: string }> }) {
  const sp = await searchParams;
  return (
    <section className="shell pt-24 lg:pt-28">
      <div className="mb-6 max-w-3xl">
        <p className="label">~/testimonials/new</p>
        <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">Thanks for working with me</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--muted)]">
          If you have a minute, I&apos;d love to hear how it went. A few honest sentences are perfect, and you&apos;ll see a preview as you type.
        </p>
      </div>
      <TestimonialForm defaults={{ company: sp.company?.slice(0, 80), project: sp.project?.slice(0, 80) }} />
    </section>
  );
}
