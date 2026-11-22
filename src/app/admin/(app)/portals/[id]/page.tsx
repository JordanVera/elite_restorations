import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PortalLinkCard, PortalSettingsCard } from '@/components/admin/portal/portal-controls';
import { RequirementList } from '@/components/admin/portal/requirement-list';
import { SourceBadge } from '@/components/admin/records';
import { Badge, Card, CardHeader, Notice, PageHeader } from '@/components/admin/ui';
import { activityLabel, actorLabel, formatDate, relativeTime } from '@/lib/activity-labels';
import { isComplete, type SelectionStatus } from '@/lib/selections/status';
import { can } from '@/server/auth/policy';
import { requireAdmin } from '@/server/auth/session';
import { getPortalForAdmin, portalActivity } from '@/server/portal/admin';
import { dateInputValue } from '@/server/portal/schemas';

export const metadata = { title: 'Portal' };

export default async function PortalPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin('view_customers');
  const { id } = await params;
  const [portal, activity] = await Promise.all([getPortalForAdmin(id), portalActivity(id)]);
  if (!portal) notFound();

  const canManage = can(admin.role, 'manage_portals');
  const canSeeMoney = can(admin.role, 'view_financials');
  const editable = canManage && portal.status !== 'REVOKED';
  const statuses = portal.requirements.map((r) => (r.selection?.status ?? 'NOT_STARTED') as SelectionStatus);
  const done = statuses.filter(isComplete).length;
  const expired = Boolean(portal.expiresAt && portal.expiresAt < new Date());

  return (
    <>
      <PageHeader
        eyebrow={
          <span className="flex flex-wrap items-center gap-1">
            <Link href="/admin/portals" className="hover:underline">
              Customer Portals
            </Link>
            <span>/</span>
            <Link href={`/admin/quotes/${portal.quote.id}`} className="hover:underline">
              Quote #{portal.quote.quoteNumber}
            </Link>
            <span>·</span>
            <Link href={`/admin/customers/${portal.quote.client.id}`} className="hover:underline">
              {portal.quote.client.name}
            </Link>
          </span>
        }
        title={
          <span className="flex flex-wrap items-center gap-2">
            {portal.title}
            {portal.status === 'PUBLISHED' && !expired ? <Badge tone="success">Published</Badge> : null}
            {portal.status === 'PUBLISHED' && expired ? <Badge tone="danger">Link expired</Badge> : null}
            {portal.status === 'DRAFT' ? <Badge>Draft</Badge> : null}
            {portal.status === 'REVOKED' ? <Badge tone="dark">Revoked</Badge> : null}
            <SourceBadge source={portal.quote.source} />
          </span>
        }
        description={`${done} of ${statuses.length} selections submitted or approved${
          portal.createdBy ? ` · Created by ${portal.createdBy.name}` : ''
        } · ${formatDate(portal.createdAt)}`}
      />

      {portal.status === 'REVOKED' ? (
        <Notice tone="warning" className="mb-6">
          This portal was revoked {portal.revokedAt ? formatDate(portal.revokedAt) : ''}. It is read-only and the customer link no longer works.
        </Notice>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="min-w-0 space-y-6">
          <RequirementList
            portalId={portal.id}
            editable={editable}
            canSeeMoney={canSeeMoney}
            categories={portal.categories}
            lineItems={portal.quote.lineItems.map((item) => ({ id: item.id, name: item.name }))}
            items={portal.requirements.map((r) => ({
              id: r.id,
              title: r.title,
              categoryId: r.categoryId,
              categoryName: r.category?.name ?? r.categoryName,
              lineItemId: r.lineItemId,
              lineItemName: r.lineItem?.name ?? null,
              area: r.area,
              instructions: r.instructions,
              customerGuidance: r.customerGuidance,
              required: r.required,
              quantity: r.quantity,
              unit: r.unit,
              allowanceCents: canSeeMoney ? r.allowanceCents : null,
              preferredOptions: r.preferredOptions,
              enabledFields: r.enabledFields,
              dueDate: r.dueDate?.toISOString() ?? null,
              selection: r.selection
                ? {
                    id: r.selection.id,
                    status: r.selection.status,
                    revisions: r.selection._count.revisions,
                    attachments: r.selection._count.attachments,
                  }
                : null,
            }))}
          />
          <Card>
            <CardHeader title="Activity" description="Everything that happened on this portal." />
            {activity.length === 0 ? (
              <p className="px-5 py-6 text-sm text-muted-foreground">No activity yet.</p>
            ) : (
              <ol className="divide-y divide-border">
                {activity.map((entry) => {
                  const meta = (entry.metadata ?? {}) as { title?: string };
                  return (
                    <li key={entry.id} className="flex items-baseline justify-between gap-4 px-5 py-2.5 text-sm">
                      <span className="min-w-0">
                        <span className="font-medium">{actorLabel(entry.actorType, entry.actorName)}</span>{' '}
                        {activityLabel(entry.action)}
                        {meta.title ? <span className="text-muted-foreground"> · {meta.title}</span> : null}
                      </span>
                      <span className="shrink-0 text-[0.75rem] text-muted-foreground" title={entry.createdAt.toISOString()}>
                        {relativeTime(entry.createdAt)}
                      </span>
                    </li>
                  );
                })}
              </ol>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          {canManage ? (
            <PortalLinkCard portalId={portal.id} status={portal.status} neverPublished={!portal.publishedAt} />
          ) : null}
          <PortalSettingsCard
            portalId={portal.id}
            editable={editable}
            canSeeMoney={canSeeMoney}
            initial={{
              title: portal.title,
              welcomeMessage: portal.welcomeMessage,
              showAllowances: portal.showAllowances,
              expiresAt: dateInputValue(portal.expiresAt),
            }}
          />
          <p className="px-1 text-[0.8rem] text-muted-foreground">
            Customer selections are internal material approvals only. They never change the Jobber quote, prices, or line items.
          </p>
        </div>
      </div>
    </>
  );
}
