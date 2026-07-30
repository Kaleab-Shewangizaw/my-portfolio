import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of web and mobile products built by Kaleab Shewangizaw (Kal_X) — CTO at Pazimo. Covers event ticketing, developer communities, social platforms, and more.",
  openGraph: {
    title: "Projects · Kal_X",
    description: "Web and mobile products built by Kal_X — CTO at Pazimo.",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
