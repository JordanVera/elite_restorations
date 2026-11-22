import { ClipboardCheck, Paperclip, X } from 'lucide-react';
import Link from 'next/link';

import { ListToolbar } from '@/components/admin/list-toolbar';
import { Pagination, SourceBadge } from '@/components/admin/records';
import { Badge, Card, EmptyState, PageHeader, Table, Td, Th } from '@/components/admin/ui';
import { relativeTime } from '@/lib/activity-labels';
import { listHref } from '@/lib/admin/list-params';
import { statusLabel, statusTone } from '@/lib/selections/status';
import { requireAdmin } from '@/server/auth/session';
import { listSelections, REVIEW_STATUS_FILTERS, type ReviewStatusFilter } from '@/server/review/queries';

export const metadata = { title: 'Material Selections' };

function one(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? '';
}

export default async function SelectionsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdmin('review_selections');
  const raw = await searchParams;
  const q = one(raw.q).slice(0, 100);
  const statusRaw = one(raw.status);
  const status: ReviewStatusFilter = (REVIEW_STATUS_FILTERS as readonly string[]).includes(statusRaw) ? (statusRaw as ReviewStatusFilter) : 'SUBMITTED';
  const portalId = one(raw.portal).slice(0, 40);
  const page = Math.max(1, Number.parseInt(one(raw.page), 10) || 1);
  const { total, rows, portal } = await listSelections({ q, status, portalId, page });
  const current = { q, status, portal: portalId };

  return (
    <>
      <PageHeader
        title="Material Selections"
        description="Review what customers chose. Approval here is internal material approval only. It never changes the Jobber quote, price, or contract."
      />
      <Card>
        <ListToolbar
          placeholder="Search selection, product, customer, or quote number"
          query={q}
          selects={[
            {
              name: 'status',
              label: 'Status',
              value: status,
              options: [
                { value: 'SUBMITTED', label: 'Needs review' },
                { value: 'CHANGES_REQUESTED', label: 'Changes requested' },
                { value: 'APPROVED', label: 'Approved' },
                { value: 'DRAFT', label: 'Customer drafts' },
                { value: 'all', label: 'All started' },
              ],
            },
          ]}
        />
        {portalId ? (
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 text-[0.8rem]">
            <span className="text-muted-foreground">Portal:</span>
            <Link href={`/admin/portals/${portalId}`} className="font-medium hover:underline">
              {portal?.title ?? 'Unknown portal'}
            </Link>
            <Link
              href={listHref('/admin/selections', current, { portal: null })}
              className="ml-1 inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" /> Clear
            </Link>
          </div>
        ) : null}
        {rows.length === 0 ? (
          <EmptyState
            icon={<ClipboardCheck />}
            title={status === 'SUBMITTED' && !q ? 'Nothing waiting for review' : 'No selections match'}
            description={
              status === 'SUBMITTED' && !q ? 'When a customer submits a selection, it shows up here.' : 'Try another status or search.'
            }
          />
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <Th>Selection</Th>
                  <Th className="hidden md:table-cell">Customer</Th>
                  <Th>Status</Th>
                  <Th className="hidden lg:table-cell">{status === 'SUBMITTED' ? 'Waiting since' : 'Updated'}</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const { requirement } = row;
                  const { quote } = requirement.portal;
                  return (
                    <tr key={row.id} className="hover:bg-surface-2/40">
                      <Td>
                        <Link href={`/admin/selections/${row.id}`} className="font-medium hover:underline">
                          {requirement.title}
                        </Link>
                        <div className="text-[0.8rem] text-muted-foreground">
                          {[requirement.area, requirement.categoryName].filter(Boolean).join(' · ')}
                        </div>
                        {row.productName ? <div className="mt-0.5 text-[0.8rem]">{row.productName}</div> : null}
                        <div className="mt-0.5 text-[0.8rem] text-muted-foreground md:hidden">{quote.client.name}</div>
                      </Td>
                      <Td className="hidden md:table-cell">
                        <Link href={`/admin/customers/${quote.client.id}`} className="hover:underline">
                          {quote.client.name}
                        </Link>{' '}
                        <SourceBadge source={quote.source} />
                        <div className="text-[0.8rem] text-muted-foreground">
                          <Link href={`/admin/quotes/${quote.id}`} className="hover:underline">
                            Quote #{quote.quoteNumber}
                          </Link>
                        </div>
                      </Td>
                      <Td>
                        <Badge tone={statusTone(row.status)}>{statusLabel(row.status)}</Badge>
                        <div className="mt-1 flex items-center gap-2 text-[0.75rem] text-muted-foreground">
                          {row._count.revisions > 1 ? <span>Revision {row._count.revisions}</span> : null}
                          {row._count.attachments ? (
                            <span className="inline-flex items-center gap-0.5">
                              <Paperclip className="size-3" aria-hidden /> {row._count.attachments}
                            </span>
                          ) : null}
                        </div>
                      </Td>
                      <Td className="hidden text-[0.8rem] whitespace-nowrap text-muted-foreground lg:table-cell">
                        {relativeTime(status === 'SUBMITTED' && row.submittedAt ? row.submittedAt : row.updatedAt)}
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Pagination page={page} total={total} href={(p) => listHref('/admin/selections', current, { page: p })} />
          </>
        )}
      </Card>
    </>
  );
}
