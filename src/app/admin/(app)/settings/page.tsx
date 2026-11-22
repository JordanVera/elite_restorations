import { ChevronRight, Layers, PlugZap, UserRound } from 'lucide-react';
import Link from 'next/link';

import { Card, PageHeader } from '@/components/admin/ui';
import { can } from '@/server/auth/policy';
import { requireAdmin } from '@/server/auth/session';

export const metadata = { title: 'Settings' };

export default async function SettingsPage() {
  const admin = await requireAdmin('view_dashboard');
  const items = [
    {
      href: '/admin/settings/integrations',
      title: 'Integrations',
      description: 'Connect Jobber, sync customers and quotes, and check the connection.',
      icon: PlugZap,
      allowed: can(admin.role, 'manage_integrations'),
    },
    {
      href: '/admin/settings/categories',
      title: 'Selection categories',
      description: 'Templates for flooring, countertops, tile, fixtures, and other materials.',
      icon: Layers,
      allowed: can(admin.role, 'manage_categories'),
    },
  ];

  return (
    <>
      <PageHeader title="Settings" />
      <div className="grid gap-4 md:grid-cols-2">
        {items
          .filter((item) => item.allowed)
          .map((item) => (
            <Link key={item.href} href={item.href} className="group block rounded-[12px] outline-none focus-visible:ring-2 focus-visible:ring-foreground/30">
              <Card className="flex items-center gap-4 p-5 transition-colors group-hover:border-foreground/25">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-surface-2">
                  <item.icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{item.title}</span>
                  <span className="block text-sm text-muted-foreground">{item.description}</span>
                </span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Card>
            </Link>
          ))}
        <Card className="flex items-center gap-4 p-5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-surface-2">
            <UserRound className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium">Your account</span>
            <span className="block text-sm text-muted-foreground">
              {admin.name} · {admin.email} · {admin.role === 'ADMIN' ? 'Administrator' : 'Staff'}
            </span>
            <span className="mt-1 block text-[0.8rem] text-muted-foreground">
              Accounts and password resets are managed with <code className="rounded bg-surface-2 px-1">npm run admin:create</code>.
            </span>
          </span>
        </Card>
      </div>
    </>
  );
}
