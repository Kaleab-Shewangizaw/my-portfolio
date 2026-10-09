import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { AdminLogin } from "@/components/testimonials/Admin";
import { ProjectEditor } from "@/components/admin/ProjectEditor";

export const metadata: Metadata = {
  title: "New project",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  if (!(await isAdmin())) return <AdminLogin />;
  return <ProjectEditor />;
}
