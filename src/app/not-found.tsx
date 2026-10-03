import Link from "next/link";
import { UnlockOnMount } from "@/components/UnlockOnMount";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center pt-32">
      <UnlockOnMount id="lost" />
      <p className="label">zsh: 404: page not found</p>
      <h1 className="mt-6 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1] tracking-[-0.045em]">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-8 max-w-md text-lg text-[var(--muted)]">It may have moved, or the link has a typo. Press ⌘K to jump anywhere.</p>
      <Link href="/" className="mt-10 inline-flex h-12 w-fit items-center rounded-full bg-[var(--fg)] px-6 text-sm font-medium text-[var(--bg)]">
        Back home
      </Link>
    </section>
  );
}
