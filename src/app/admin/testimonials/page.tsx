import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { listAll } from "@/lib/testimonials";
import { AdminLogin, AdminDashboard } from "@/components/testimonials/Admin";

export const metadata: Metadata = {
  title: "Testimonials admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) return <AdminLogin />;
  let items;
  try {
    items = await listAll();
  } catch {
    return (
      <section className="shell pt-28">
        <div className="card p-8 text-[var(--muted)]">Can&apos;t reach the database. Check MONGODB_URI and Atlas network access.</div>
      </section>
    );
  }
  return <AdminDashboard items={items} />;
}
