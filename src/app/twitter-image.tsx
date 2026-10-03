import { site } from "@/content/site";
import { ogSize, renderOg } from "@/lib/og";

export const alt = `${site.name}, ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: `~/kaleab · ${site.current.toLowerCase()}`,
    title: site.name,
    subtitle: "I build web and mobile apps, the backends behind them and the servers they run on.",
  });
}
