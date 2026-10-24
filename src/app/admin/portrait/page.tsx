import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { DEFAULT_PORTRAIT, getUploadedPortrait } from "@/lib/portrait";
import { AdminLogin } from "@/components/testimonials/Admin";
import { PortraitEditor } from "@/components/admin/PortraitEditor";

export const metadata: Metadata = {
  title: "Portrait",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPortraitPage() {
  if (!(await isAdmin())) return <AdminLogin />;
  return <PortraitEditor uploaded={await getUploadedPortrait()} fallback={DEFAULT_PORTRAIT} />;
}
