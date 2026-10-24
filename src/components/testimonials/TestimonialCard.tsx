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

function QuoteMark() {
  return (
    <svg viewBox="0 0 32 24" className="h-6 w-8 text-[var(--fg)]" aria-hidden>
      <path
        fill="currentColor"
        d="M0 24V14.4C0 6.2 4.4 1.4 12 0l1.4 3.2C9 4.6 6.9 7.4 6.6 11H12v13H0zm18 0V14.4C18 6.2 22.4 1.4 30 0l1.4 3.2C27 4.6 24.9 7.4 24.6 11H30v13H18z"
      />
    </svg>
  );
}

/** `featured` is the wide, large-type version used for the first quote on a page. */
export function TestimonialCard({ t, className, featured }: { t: CardData; className?: string; featured?: boolean }) {
  const sub = [t.role, t.company].filter(Boolean).join(", ");
  // Skip the project when it only repeats the role line.
  const context = [t.relation, t.project && !sub.includes(t.project) ? t.project : ""].filter(Boolean).join(" · ");
  return (
    <figure className={cn("card flex flex-col p-6 sm:p-7", featured && "sm:p-8", className)}>
      <div className="flex items-start justify-between gap-3">
        <QuoteMark />
        {t.rating ? <Stars value={t.rating} /> : null}
      </div>
      <blockquote className={cn("mt-5 whitespace-pre-line text-[15px] leading-relaxed", featured && "max-w-3xl text-base sm:text-[17px]")}>
        {t.message || "Your words will appear here."}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-7">
        {t.avatarSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.avatarSrc} alt="" className="size-11 shrink-0 rounded-full object-cover" loading="lazy" />
        ) : (
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--fg)] text-sm font-semibold text-[var(--bg)]">
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
          {sub && <span className="block text-sm text-[var(--muted)]">{sub}</span>}
          {context && <span className="block text-xs text-[var(--faint)]">{context}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
