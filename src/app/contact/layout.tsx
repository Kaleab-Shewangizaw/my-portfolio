import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kaleab Shewangizaw (Kal_X) — CTO at Pazimo, based in Addis Ababa. Available for interesting projects, collaborations, and conversations.",
  openGraph: {
    title: "Contact · Kal_X",
    description: "Reach out to Kal_X — CTO at Pazimo, Addis Ababa.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
