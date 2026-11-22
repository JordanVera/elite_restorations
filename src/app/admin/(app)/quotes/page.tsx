import { FileText } from 'lucide-react';
import Link from 'next/link';

import { ListToolbar } from '@/components/admin/list-toolbar';
import { Pagination, PortalStatusBadge, SourceBadge } from '@/components/admin/records';
import { Badge, Card, EmptyState, PageHeader, Table, Td, Th } from '@/components/admin/ui';
import { formatDate, formatMoney } from '@/lib/activity-labels';
import { listHref, quoteListParams } from '@/lib/admin/list-params';
import { listQuotes, quoteStatuses } from '@/server/admin/records';
import { can } from '@/server/auth/policy';
import { requireAdmin } from '@/server/auth/session';
import { quoteStatusLabel } from '@/server/jobber/queries';

export const metadata = { title: 'Quotes' };

export default async function QuotesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const admin = await requireAdmin('view_customers');
  const showTotals = can(admin.role, 'view_financials');
  const statuses = await quoteStatuses();
  const params = quoteListParams(await searchParams, statuses, showTotals);
  const { total, rows } = await listQuotes(params);
  const filtered = Boolean(params.q || params.status || params.portal !== 'any');
  const current = {
    q: params.q,
    status: params.status,
    portal: params.portal === 'any' ? '' : params.portal,
    sort: params.sort === 'newest' ? '' : params.sort,
  };

  return (
    <>
      <PageHeader
        title="Quotes"
        description="Quotes synced from Jobber. Material portals are built from a quote; they never change the quote in Jobber."
      />
      <Card>
        <ListToolbar
          placeholder="Search quote number, title, customer, or address"
          query={params.q}
          selects={[
            {
              name: 'status',
              label: 'Status',
              value: params.status,
              options: [{ value: '', label: 'All' }, ...statuses.map((s) => ({ value: s, label: quoteStatusLabel(s) }))],
            },
            {
              name: 'portal',
              label: 'Portal',
              value: params.portal === 'any' ? '' : params.portal,
              options: [
                { value: '', label: 'Any' },
                { value: 'none', label: 'No portal' },
                { value: 'draft', label: 'Draft' },
                { value: 'published', label: 'Published' },
              ],
            },
            {
              name: 'sort',
              label: 'Sort',
              value: params.sort === 'newest' ? '' : params.sort,
              options: [
                { value: '', label: 'Newest' },
                { value: 'oldest', label: 'Oldest' },
                ...(showTotals ? [{ value: 'total', label: 'Highest total' }] : []),
              ],
            },
          ]}
        />
        {rows.length === 0 ? (
          <EmptyState
            icon={<FileText />}
            title={filtered ? 'No quotes match' : 'No quotes yet'}
            description={filtered ? 'Clear a filter or try another search.' : 'Run a sync from Settings > Integrations to import quotes from Jobber.'}
          />
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <Th>Quote</Th>
                  <Th className="hidden md:table-cell">Customer</Th>
                  <Th>Status</Th>
                  <Th className="hidden lg:table-cell">Date</Th>
                  {showTotals ? <Th className="hidden text-right sm:table-cell">Total</Th> : null}
                  <Th>Material portal</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-surface-2/40">
                    <Td>
                      <Link href={`/admin/quotes/${row.id}`} className="font-medium hover:underline">
                        #{row.quoteNumber}
                      </Link>{' '}
                      <SourceBadge source={row.source} />
                      <div className="max-w-64 truncate text-[0.8rem] text-muted-foreground">{row.title ?? row.propertyAddress}</div>
                      <div className="text-[0.8rem] text-muted-foreground md:hidden">{row.client.name}</div>
                    </Td>
                    <Td className="hidden md:table-cell">
                      <Link href={`/admin/customers/${row.client.id}`} className="hover:underline">
                        {row.client.name}
                      </Link>
                    </Td>
                    <Td>
                      <Badge>{quoteStatusLabel(row.status)}</Badge>
                    </Td>
                    <Td className="hidden whitespace-nowrap text-muted-foreground lg:table-cell">{formatDate(row.quoteDate)}</Td>
                    {showTotals ? (
                      <Td className="hidden text-right tabular-nums sm:table-cell">{formatMoney(row.total)}</Td>
                    ) : null}
                    <Td>
                      <PortalStatusBadge portal={row.portal} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination page={params.page} total={total} href={(page) => listHref('/admin/quotes', current, { page })} />
          </>
        )}
      </Card>
    </>
  );
}
