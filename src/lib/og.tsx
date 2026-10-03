import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

const BLADE = "M50,14 A36,36 0 0 1 86,50 C78,34 66,24 50,14 Z";

// Google Fonts serves TTF (which the image renderer needs) to non-browser clients.
async function font(family: string, weight: number) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

/** Shared social card: flat black, the Kal_X mark, a title and a subtitle. */
export async function renderOg({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  const [semibold, regular, mono] = await Promise.all([font("Geist", 600), font("Geist", 400), font("Geist+Mono", 400)]);
  const fonts = [
    semibold && { name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const },
    regular && { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
    mono && { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" }[];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#000", color: "#ede9e1", padding: "64px 72px", fontFamily: "Geist" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="64" height="64" viewBox="0 0 100 100">
              <path d={BLADE} fill="#d97e3a" />
              <path d={BLADE} fill="#ede9e1" transform="rotate(120 50 50)" />
              <path d={BLADE} fill="#ede9e1" transform="rotate(240 50 50)" />
            </svg>
            <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>{site.alias}</span>
          </div>
          <span style={{ fontFamily: "Geist Mono", fontSize: 24, color: "#8f8a81" }}>{site.url.replace("https://", "")}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "Geist Mono", fontSize: 26, color: "#e8955a" }}>{eyebrow}</span>
          <span style={{ marginTop: 18, fontSize: title.length > 26 ? 76 : 96, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>{title}</span>
          <span style={{ marginTop: 26, fontSize: 32, color: "#8f8a81", lineHeight: 1.35, maxWidth: 980 }}>{subtitle}</span>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, background: "#d97e3a", borderRadius: 3 }} />
      </div>
    ),
    { ...ogSize, fonts: fonts.length ? fonts : undefined },
  );
}
