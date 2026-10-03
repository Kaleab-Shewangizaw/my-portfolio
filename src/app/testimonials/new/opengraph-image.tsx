import { ogSize, renderOg } from "@/lib/og";

export const alt = "Leave a testimonial for Kaleab";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "~/testimonials/new",
    title: "Worked with me?",
    subtitle: "I'd love to hear how it went. It takes two minutes, and you'll see a preview as you write.",
  });
}
