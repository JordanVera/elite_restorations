import { ClipboardList } from 'lucide-react';
import Link from 'next/link';

import { ListToolbar } from '@/components/admin/list-toolbar';
import { Pagination, SourceBadge } from '@/components/admin/records';
import { Badge, ButtonLink, Card, CardHeader, EmptyState, PageHeader, Table, Td, Th } from '@/components/admin/ui';
import { ResourceCards } from '@/components/portal/resource-cards';
import { SupplierMark } from '@/components/portal/supplier-mark';
import { formatDate, relativeTime } from '@/lib/activity-labels';
import { listHref } from '@/lib/admin/list-params';
import { can } from '@/server/auth/policy';
import { requireAdmin } from '@/server/auth/session';
import { listPortals, PORTAL_STATUS_FILTERS } from '@/server/portal/admin';
import { listPortalResources } from '@/server/portal/resources';

export const metadata = { title: 'Customer Portals' };

function one(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? '';
}

export default async function PortalsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const admin = await requireAdmin('view_customers');
  const raw = await searchParams;
  const q = one(raw.q).slice(0, 100);
  const statusRaw = one(raw.status);
  const status = (PORTAL_STATUS_FILTERS as readonly string[]).includes(statusRaw) ? statusRaw : '';
  const page = Math.max(1, Number.parseInt(one(raw.page), 10) || 1);
  const [{ total, rows }, catalog] = await Promise.all([listPortals({ q, status, page }), listPortalResources({ activeOnly: true })]);

  return (
    <>
      <PageHeader
        title="Customer Portals"
        description="Material selection checklists shared with customers. Create one from a quote."
        actions={
          <ButtonLink href="/admin/quotes?portal=none" variant="secondary">
            Quotes without a portal
          </ButtonLink>
        }
      />
      <Card className="mb-6">
        <CardHeader
          title="Where we send customers"
          description="Logos and links the customer sees on their portal, based on the materials on that job. Open a portal to add or hide a supplier."
          action={
            can(admin.role, 'manage_categories') ? (
              <ButtonLink href="/admin/settings/resources" variant="secondary" size="sm">
                Manage resources
              </ButtonLink>
            ) : null
          }
        />
        <div className="px-5 pb-5">
          {catalog.length ? (
            <ResourceCards resources={catalog} />
          ) : (
            <p className="text-sm text-muted-foreground">No shopping resources yet. Add them under Settings.</p>
          )}
        </div>
      </Card>

      <Card>
        <ListToolbar
          placeholder="Search portal, customer, or quote number"
          query={q}
          selects={[
            {
              name: 'status',
              label: 'Status',
              value: status,
              options: [
                { value: '', label: 'Active (draft + published)' },
                { value: 'DRAFT', label: 'Draft' },
                { value: 'PUBLISHED', label: 'Published' },
                { value: 'REVOKED', label: 'Revoked' },
              ],
            },
          ]}
        />
        {rows.length === 0 ? (
          <EmptyState
            icon={<ClipboardList />}
            title={q || status ? 'No portals match' : 'No portals yet'}
            description="Open a quote and choose Create Material Selection Portal."
            action={
              <ButtonLink href="/admin/quotes" variant="secondary">
                Browse quotes
              </ButtonLink>
            }
          />
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <Th>Portal</Th>
                  <Th className="hidden md:table-cell">Customer</Th>
                  <Th>Status</Th>
                  <Th>Progress</Th>
                  <Th className="hidden xl:table-cell">Resources</Th>
                  <Th className="hidden lg:table-cell">Updated</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-surface-2/40">
                    <Td>
                      <Link href={`/admin/portals/${row.id}`} className="font-medium hover:underline">
                        {row.title}
                      </Link>{' '}
                      <SourceBadge source={row.quote.source} />
                      <div className="text-[0.8rem] text-muted-foreground">
                        Quote #{row.quote.quoteNumber}
                        <span className="md:hidden"> · {row.quote.client.name}</span>
                      </div>
                    </Td>
                    <Td className="hidden md:table-cell">
                      <Link href={`/admin/customers/${row.quote.client.id}`} className="hover:underline">
                        {row.quote.client.name}
                      </Link>
                    </Td>
                    <Td>
                      {row.status === 'REVOKED' ? (
                        <Badge tone="neutral">Revoked</Badge>
                      ) : row.status === 'DRAFT' ? (
                        <Badge tone="neutral">Draft</Badge>
                      ) : row.expired ? (
                        <Badge tone="danger">Expired</Badge>
                      ) : (
                        <Badge tone="success">Published</Badge>
                      )}
                      {row.expiresAt && row.status === 'PUBLISHED' && !row.expired ? (
                        <div className="mt-1 text-[0.75rem] text-muted-foreground">Until {formatDate(row.expiresAt)}</div>
                      ) : null}
                    </Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-2">
                          <div
                            className="h-full rounded-full bg-emerald-600"
                            style={{ width: `${row.total ? Math.round((row.done / row.total) * 100) : 0}%` }}
                          />
                        </div>
                        <span className="text-[0.8rem] tabular-nums">
                          {row.done}/{row.total}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {row.submitted ? <Badge tone="warning">{row.submitted} to review</Badge> : null}
                        {row.changes ? <Badge tone="info">{row.changes} changes requested</Badge> : null}
                      </div>
                    </Td>
                    <Td className="hidden xl:table-cell">
                      {row.resources.length ? (
                        <div className="flex flex-wrap gap-1">
                          {row.resources.map((resource) => (
                            <span key={resource.slug} title={resource.name}>
                              <SupplierMark resource={resource} className="size-7 rounded-[6px]" />
                              <span className="sr-only">{resource.name}</span>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[0.8rem] text-muted-foreground">—</span>
                      )}
                    </Td>
                    <Td className="hidden text-[0.8rem] whitespace-nowrap text-muted-foreground lg:table-cell">
                      {relativeTime(row.updatedAt)}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination page={page} total={total} href={(p) => listHref('/admin/portals', { q, status }, { page: p })} />
          </>
        )}
      </Card>
    </>
  );
}
