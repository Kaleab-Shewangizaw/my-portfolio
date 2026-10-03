"use client";

import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  radius?: number;
  /** Width of the refracting rim in px. */
  bezel?: number;
  /** Displacement strength in px. */
  depth?: number;
  /** Frost behind the refraction in px. */
  frost?: number;
};

let chromium: boolean | null = null;
function isChromium() {
  if (chromium !== null) return chromium;
  const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } })
    .userAgentData?.brands;
  chromium = !!brands?.some((b) => b.brand === "Chromium");
  return chromium;
}

/**
 * Builds a displacement map for a rounded rectangle: neutral grey in the
 * middle, and along the rim a vector pointing inward whose length follows a
 * convex lens profile. Fed to feDisplacementMap, it bends the backdrop at
 * the edges the way a thick piece of glass does.
 */
function buildMap(w: number, h: number, r: number, bezel: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(w, h);
  const cx = w / 2;
  const cy = h / 2;
  const rr = Math.min(r, cx, cy);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cy;
      const px = Math.abs(dx) - (cx - rr);
      const py = Math.abs(dy) - (cy - rr);

      let dist: number;
      let nx = 0;
      let ny = 0;
      if (px > 0 && py > 0) {
        const len = Math.hypot(px, py);
        dist = rr - len;
        nx = (px / (len || 1)) * Math.sign(dx);
        ny = (py / (len || 1)) * Math.sign(dy);
      } else if (px > py) {
        dist = rr - px;
        nx = Math.sign(dx);
      } else {
        dist = rr - py;
        ny = Math.sign(dy);
      }

      const i = (y * w + x) * 4;
      let mag = 0;
      if (dist >= 0 && dist < bezel) {
        const t = 1 - dist / bezel;
        mag = 1 - Math.sqrt(1 - t * t); // circular lens profile
      }
      // Sample inward: negative of the outward normal.
      img.data[i] = 128 - nx * mag * 127;
      img.data[i + 1] = 128 - ny * mag * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}

export const LiquidGlass = forwardRef<HTMLDivElement, Props>(function LiquidGlass(
  { radius = 24, bezel = 22, depth = 46, frost = 4, className, style, children, ...rest },
  forwarded,
) {
  const ref = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwarded, () => ref.current!);
  const id = "lg" + useId().replace(/:/g, "");
  const [map, setMap] = useState<{ url: string; w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isChromium()) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const w = Math.round(el.offsetWidth);
        const h = Math.round(el.offsetHeight);
        if (!w || !h) return;
        setMap((m) => (m && m.w === w && m.h === h ? m : { url: buildMap(w, h, radius, bezel), w, h }));
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [radius, bezel]);

  const refract = map
    ? `blur(${frost}px) url(#${id}) saturate(180%) brightness(1.04)`
    : undefined;

  return (
    <div
      ref={ref}
      className={cn("glass", className)}
      style={{
        borderRadius: radius,
        ...(refract ? { backdropFilter: refract, WebkitBackdropFilter: refract } : null),
        ...style,
      }}
      {...rest}
    >
      {map && (
        <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
          <filter
            id={id}
            x="0"
            y="0"
            width={map.w}
            height={map.h}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage href={map.url} x="0" y="0" width={map.w} height={map.h} result="map" preserveAspectRatio="none" />
            {/* Slightly different strengths per channel give a faint chromatic fringe. */}
            <feDisplacementMap in="SourceGraphic" in2="map" scale={depth} xChannelSelector="R" yChannelSelector="G" result="dr" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale={depth * 0.92} xChannelSelector="R" yChannelSelector="G" result="dg" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale={depth * 0.84} xChannelSelector="R" yChannelSelector="G" result="db" />
            <feColorMatrix in="dr" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feColorMatrix in="dg" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feColorMatrix in="db" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
            <feBlend in="r" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="b" mode="screen" />
          </filter>
        </svg>
      )}
      {children}
    </div>
  );
});
