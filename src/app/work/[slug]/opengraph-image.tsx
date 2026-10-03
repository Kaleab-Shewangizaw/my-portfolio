import { projects } from "@/content/site";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params;
  const project = projects.find((x) => x.slug === slug) ?? projects[0];
  return renderOg({
    eyebrow: `case study · ${project.kind.toLowerCase()}`,
    title: project.name,
    subtitle: project.summary.length > 140 ? project.summary.slice(0, 137).trimEnd() + "…" : project.summary,
  });
}
