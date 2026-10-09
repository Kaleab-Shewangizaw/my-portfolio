import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { projects } from "@/content/site";
import { getProjectImages } from "@/lib/projectImages";
import { AdminLogin } from "@/components/testimonials/Admin";
import { ProjectImages } from "@/components/admin/ProjectImages";

export const metadata: Metadata = {
  title: "Project images",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  if (!(await isAdmin())) return <AdminLogin />;
  return <ProjectImages projects={projects} images={await getProjectImages()} />;
}
