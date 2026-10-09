import { cn } from "@/lib/utils";

/** An organisation's logo on a white chip, so every brand reads in both themes. Falls back to initials. */
export function OrgLogo({ org, logo, className }: { org: string; logo?: string; className?: string }) {
  // "GDG · AAU" → "GDG"; "Some Company" → "SC".
  const first = org.split("·")[0].trim();
  const initials = (/^[A-Z0-9]{2,4}$/.test(first) ? first : first.split(/\s+/).map((w) => w[0]).join("")).slice(0, 3).toUpperCase();
  return (
    <span className={cn("grid h-9 min-w-9 max-w-[104px] shrink-0 place-items-center overflow-hidden rounded-lg border border-[var(--line)] bg-white px-1.5", className)}>
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={`${org} logo`} className="h-6 w-auto max-w-full object-contain" loading="lazy" />
      ) : (
        <span className="mono text-[11px] font-semibold text-[#18181b]">{initials}</span>
      )}
    </span>
  );
}
