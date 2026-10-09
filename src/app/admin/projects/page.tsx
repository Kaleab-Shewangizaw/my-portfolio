import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { getAllProjects } from "@/lib/projects";
import { getProjectImages } from "@/lib/projectImages";
import { AdminLogin } from "@/components/testimonials/Admin";
import { ProjectList } from "@/components/admin/ProjectList";

export const metadata: Metadata = {
  title: "Projects admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  if (!(await isAdmin())) return <AdminLogin />;
  const [projects, images] = await Promise.all([getAllProjects(), getProjectImages()]);
  return <ProjectList projects={projects} images={images} />;
}
