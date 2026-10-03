"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: site.timezone,
});

export function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 15_000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className={className} suppressHydrationWarning>
      {now ?? "--:--"} · {site.location}
    </span>
  );
}
