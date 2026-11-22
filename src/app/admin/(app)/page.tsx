import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  FileText,
  Hourglass,
  SquareStack,
  Users,
} from 'lucide-react';
import Link from 'next/link';

import { Badge, ButtonLink, Card, CardHeader, EmptyState, Notice, PageHeader, Stat } from '@/components/admin/ui';
import { activityLabel, actorLabel, relativeTime } from '@/lib/activity-labels';
import { attentionItems, dashboardStats, recentActivity } from '@/server/admin/dashboard';
import { requireAdmin } from '@/server/auth/session';

export const metadata = { title: 'Dashboard' };

export default async function AdminDashboardPage({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const admin = await requireAdmin('view_dashboard');
  const { denied } = await searchParams;
  const [stats, attention, activity] = await Promise.all([dashboardStats(), attentionItems(), recentActivity()]);
  const firstName = admin.name.split(' ')[0];

  return (
    <>
      <PageHeader
        title={`Good to see you, ${firstName}`}
        description="Material selections and customer portals across your Jobber quotes."
        actions={
          <ButtonLink href="/admin/quotes" variant="primary">
            Create a portal from a quote
          </ButtonLink>
        }
      />
      {denied ? (
        <Notice tone="warning" className="mb-6">
          Your account does not have access to that page.
        </Notice>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Stat label="Imported Jobber customers" value={stats.customers} icon={<Users />} href="/admin/customers" />
        <Stat
          label="Linked quotes"
          value={stats.linkedQuotes}
          hint={`${stats.quotes} quote${stats.quotes === 1 ? '' : 's'} synced`}
          icon={<FileText />}
          href="/admin/quotes"
        />
        <Stat label="Active customer portals" value={stats.activePortals} icon={<SquareStack />} href="/admin/portals" />
        <Stat
          label="Portals awaiting customer"
          value={stats.portalsAwaitingCustomer}
          hint="Required selections not yet submitted"
          icon={<Hourglass />}
          href="/admin/portals?filter=awaiting"
        />
        <Stat
          label="Selections awaiting review"
          value={stats.selectionsAwaitingReview}
          icon={<ClipboardList />}
          href="/admin/selections?status=SUBMITTED"
        />
        <Stat
          label="Completed selections"
          value={stats.selectionsApproved}
          hint="Approved internally"
          icon={<CheckCircle2 />}
          href="/admin/selections?status=APPROVED"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <Card>
          <CardHeader title="Projects requiring attention" description="Reviews waiting, overdue, or due soon." />
          {attention.length === 0 ? (
            <EmptyState
              icon={<CheckCircle2 />}
              title="Nothing needs attention"
              description="Submitted selections and approaching deadlines will show up here."
            />
          ) : (
            <ul className="divide-y divide-border">
              {attention.map((item) => (
                <li key={item.portalId}>
                  <Link
                    href={`/admin/portals/${item.portalId}`}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-surface-2/60"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{item.title}</p>
                      <p className="truncate text-[0.8rem] text-muted-foreground">
                        {item.customer} · Quote #{item.quoteNumber} · {item.progress.done} of {item.progress.total} completed
                      </p>
                    </div>
                    <Badge tone={item.tone}>
                      {item.tone === 'danger' ? <AlertCircle className="size-3" /> : null}
                      {item.reason}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <CardHeader title="Recent activity" />
          {activity.length === 0 ? (
            <EmptyState title="No activity yet" description="Portal, selection, and sync events are recorded here." />
          ) : (
            <ol className="divide-y divide-border">
              {activity.map((entry) => (
                <li key={entry.id} className="flex items-start gap-3 px-5 py-3">
                  <span
                    className={
                      entry.actorType === 'CUSTOMER'
                        ? 'mt-1.5 size-2 shrink-0 rounded-full bg-sky-500'
                        : entry.actorType === 'SYSTEM'
                          ? 'mt-1.5 size-2 shrink-0 rounded-full bg-neutral-400'
                          : 'mt-1.5 size-2 shrink-0 rounded-full bg-foreground'
                    }
                    aria-hidden
                  />
                  <div className="min-w-0 text-sm">
                    <p>
                      <span className="font-medium">{actorLabel(entry.actorType, entry.actorName)}</span>{' '}
                      {activityLabel(entry.action)}
                      {entry.portal ? (
                        <>
                          {' '}
                          on{' '}
                          <Link href={`/admin/portals/${entry.portal.id}`} className="underline decoration-foreground/20 underline-offset-2 hover:decoration-foreground">
                            {entry.portal.title}
                          </Link>
                        </>
                      ) : null}
                    </p>
                    <p className="text-[0.75rem] text-muted-foreground">{relativeTime(entry.createdAt)}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Card>
      </div>
    </>
  );
}
