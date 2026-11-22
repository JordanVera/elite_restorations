import { ClipboardList } from 'lucide-react';
import Link from 'next/link';

import { ListToolbar } from '@/components/admin/list-toolbar';
import { Pagination, SourceBadge } from '@/components/admin/records';
import { Badge, ButtonLink, Card, EmptyState, PageHeader, Table, Td, Th } from '@/components/admin/ui';
import { formatDate, relativeTime } from '@/lib/activity-labels';
import { listHref } from '@/lib/admin/list-params';
import { requireAdmin } from '@/server/auth/session';
import { listPortals, PORTAL_STATUS_FILTERS } from '@/server/portal/admin';

export const metadata = { title: 'Customer Portals' };

function one(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? '';
}

export default async function PortalsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin('view_customers');
  const raw = await searchParams;
  const q = one(raw.q).slice(0, 100);
  const statusRaw = one(raw.status);
  const status = (PORTAL_STATUS_FILTERS as readonly string[]).includes(statusRaw) ? statusRaw : '';
  const page = Math.max(1, Number.parseInt(one(raw.page), 10) || 1);
  const { total, rows } = await listPortals({ q, status, page });

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
