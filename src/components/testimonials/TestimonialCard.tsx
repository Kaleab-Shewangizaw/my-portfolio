import { cn } from "@/lib/utils";

export type CardData = {
  name: string;
  role: string;
  company: string;
  relation: string;
  project?: string;
  message: string;
  rating: number | null;
  link?: string;
  avatarSrc?: string | null;
};

function initials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]!.toUpperCase())
      .join("") || "?"
  );
}

export function Star({ on, className = "size-3.5" }: { on: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" fill={on ? "var(--accent)" : "var(--surface-2)"} />
    </svg>
  );
}

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} role="img" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} on={i <= value} />
      ))}
    </span>
  );
}

export function TestimonialCard({ t, className }: { t: CardData; className?: string }) {
  const sub = [t.role, t.company].filter(Boolean).join(" · ");
  return (
    <figure className={cn("card flex flex-col p-6", className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="mono rounded-md bg-[var(--surface-2)] px-2 py-0.5 text-[11px] text-[var(--muted)]">
          {t.relation}
          {t.project ? ` · ${t.project}` : ""}
        </span>
        {t.rating ? <Stars value={t.rating} /> : null}
      </div>
      <blockquote className="mt-4 flex-1 whitespace-pre-line text-[15px] leading-relaxed">
        <span className="mr-0.5 text-[var(--accent)]">“</span>
        {t.message || "Your words will appear here."}
        <span className="ml-0.5 text-[var(--accent)]">”</span>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--line)] pt-4">
        {t.avatarSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.avatarSrc} alt="" className="size-11 shrink-0 rounded-full object-cover" loading="lazy" />
        ) : (
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] text-sm font-semibold text-[var(--fg)]">
            {initials(t.name)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block truncate font-medium">
            {t.link ? (
              <a href={t.link} target="_blank" rel="noopener noreferrer nofollow" className="link-underline">
                {t.name || "Your name"}
              </a>
            ) : (
              t.name || "Your name"
            )}
          </span>
          {sub && <span className="block truncate text-sm text-[var(--muted)]">{sub}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
