import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center pt-32">
      <p className="label">Error 404</p>
      <h1 className="mt-6 text-[clamp(3.5rem,11vw,9rem)] font-medium leading-[0.88] tracking-[-0.055em]">
        Lost in <span className="font-serif italic">the glass.</span>
      </h1>
      <p className="mt-8 max-w-md text-lg text-[var(--muted)]">This page doesn&apos;t exist, or it moved. Press ⌘K to jump anywhere.</p>
      <Link href="/" className="mt-10 inline-flex h-12 w-fit items-center rounded-full bg-[var(--fg)] px-6 text-sm font-medium text-[var(--bg)]">
        Back home
      </Link>
    </section>
  );
}
