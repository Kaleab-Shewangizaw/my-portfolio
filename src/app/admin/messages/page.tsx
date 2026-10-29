import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { listMessages } from "@/lib/messages";
import { AdminLogin } from "@/components/testimonials/Admin";
import { MessageInbox } from "@/components/admin/MessageInbox";

export const metadata: Metadata = {
  title: "Messages admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function MessagesAdminPage() {
  if (!(await isAdmin())) return <AdminLogin />;
  let items;
  try {
    items = await listMessages();
  } catch {
    return (
      <section className="shell pt-28">
        <div className="card p-8 text-[var(--muted)]">Can&apos;t reach the database. Check MONGODB_URI and Atlas network access.</div>
      </section>
    );
  }
  return <MessageInbox items={items} />;
}
