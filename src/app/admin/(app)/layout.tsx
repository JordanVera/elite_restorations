import { AdminShell } from '@/components/admin/shell';
import { requireAdmin } from '@/server/auth/session';
import { jobberDataMode } from '@/server/jobber/mode';

export const dynamic = 'force-dynamic';

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin('view_dashboard');
  const mode = await jobberDataMode();
  return (
    <AdminShell user={{ name: admin.name, email: admin.email, role: admin.role }} demoData={mode.showsDemoData}>
      {children}
    </AdminShell>
  );
}
