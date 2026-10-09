import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getAllProjects, toProject } from "@/lib/projects";
import { getProjectImages } from "@/lib/projectImages";
import { AdminLogin } from "@/components/testimonials/Admin";
import { ProjectEditor } from "@/components/admin/ProjectEditor";

export const metadata: Metadata = {
  title: "Edit project",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdmin())) return <AdminLogin />;
  const { slug } = await params;
  const [projects, images] = await Promise.all([getAllProjects(), getProjectImages()]);
  const found = projects.find((p) => p.slug === slug);
  if (!found) notFound();
  return <ProjectEditor project={toProject(found)} image={images[slug]} builtIn={found.builtIn} />;
}
