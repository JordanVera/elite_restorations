import { ExternalLink, ListChecks, MapPin, Plus, UserRound } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ActionButton } from '@/components/admin/action-button';
import { PortalStatusBadge, SourceBadge } from '@/components/admin/records';
import { Badge, ButtonLink, Card, CardHeader, EmptyState, PageHeader, Table, Td, Th } from '@/components/admin/ui';
import { formatDate, formatDateTime, formatMoney } from '@/lib/activity-labels';
import { refreshQuoteAction } from '@/server/admin/record-actions';
import { getQuote } from '@/server/admin/records';
import { can } from '@/server/auth/policy';
import { requireAdmin } from '@/server/auth/session';
import { quoteStatusLabel } from '@/server/jobber/queries';

export const metadata = { title: 'Quote' };

export default async function QuotePage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin('view_customers');
  const { id } = await params;
  const quote = await getQuote(id);
  if (!quote) notFound();
  const showMoney = can(admin.role, 'view_financials');
  const canManage = can(admin.role, 'manage_portals');
  const portal = quote.activePortal;

  return (
    <>
      <PageHeader
        eyebrow={
          <Link href="/admin/quotes" className="hover:underline">
            Quotes
          </Link>
        }
        title={
          <span className="flex flex-wrap items-center gap-2">
            Quote #{quote.quoteNumber}
            <Badge>{quoteStatusLabel(quote.status)}</Badge>
            <SourceBadge source={quote.source} />
          </span>
        }
        description={quote.title ?? undefined}
        actions={
          <>
            {canManage ? (
              <ActionButton action={refreshQuoteAction.bind(null, quote.id)} pendingLabel="Refreshing">
                Refresh from Jobber
              </ActionButton>
            ) : null}
            {quote.jobberWebUri && quote.source === 'JOBBER' ? (
              <a
                href={quote.jobberWebUri}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-[8px] border border-input bg-white px-4 text-sm font-medium hover:bg-surface-2"
              >
                Open in Jobber <ExternalLink className="size-4" />
              </a>
            ) : null}
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Line items"
              description={`${quote.lineItems.length} from Jobber. Used to suggest selection categories; never edited here.`}
            />
            {quote.lineItems.length === 0 ? (
              <EmptyState title="No line items" description="This quote has no line items in Jobber." />
            ) : (
              <Table>
                <thead>
                  <tr>
                    <Th>Item</Th>
                    <Th className="text-right">Qty</Th>
                    {showMoney ? <Th className="hidden text-right sm:table-cell">Unit</Th> : null}
                    {showMoney ? <Th className="text-right">Total</Th> : null}
                  </tr>
                </thead>
                <tbody>
                  {quote.lineItems.map((item) => (
                    <tr key={item.id}>
                      <Td>
                        <div className="font-medium">{item.name}</div>
                        {item.description ? (
                          <p className="mt-0.5 max-w-xl text-[0.8rem] whitespace-pre-line text-muted-foreground">{item.description}</p>
                        ) : null}
                      </Td>
                      <Td className="text-right tabular-nums">{item.quantity ?? '—'}</Td>
                      {showMoney ? (
                        <Td className="hidden text-right tabular-nums sm:table-cell">{formatMoney(item.unitPrice)}</Td>
                      ) : null}
                      {showMoney ? <Td className="text-right tabular-nums">{formatMoney(item.totalPrice)}</Td> : null}
                    </tr>
                  ))}
                </tbody>
                {showMoney && quote.total !== null ? (
                  <tfoot>
                    <tr>
                      <Td colSpan={2} className="border-b-0 font-medium sm:hidden">
                        Quote total
                      </Td>
                      <Td colSpan={3} className="hidden border-b-0 font-medium sm:table-cell">
                        Quote total
                      </Td>
                      <Td className="border-b-0 text-right font-semibold tabular-nums">{formatMoney(quote.total)}</Td>
                    </tr>
                  </tfoot>
                ) : null}
              </Table>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Material selection portal" />
            <div className="p-5">
              {portal ? (
                <div className="space-y-4">
                  <PortalStatusBadge portal={portal} />
                  <p className="text-sm text-muted-foreground">
                    {portal.status === 'DRAFT'
                      ? 'Not published yet. The customer cannot see it.'
                      : `${portal.done} of ${portal.total} selections submitted or approved.`}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <ButtonLink href={`/admin/portals/${portal.id}`} variant="primary">
                      <ListChecks /> {canManage ? 'Manage portal' : 'View portal'}
                    </ButtonLink>
                    {portal.submitted ? (
                      <ButtonLink href={`/admin/selections?portal=${portal.id}&status=SUBMITTED`} variant="secondary">
                        Review
                      </ButtonLink>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Build a checklist of materials the customer needs to choose, based on this quote&apos;s line items.
                  </p>
                  {canManage ? (
                    <ButtonLink href={`/admin/portals/new?quoteId=${quote.id}`} variant="primary">
                      <Plus /> Create Material Selection Portal
                    </ButtonLink>
                  ) : null}
                </div>
              )}
              {quote.pastPortals.length ? (
                <p className="mt-4 border-t border-border pt-3 text-[0.8rem] text-muted-foreground">
                  {quote.pastPortals.length} revoked portal{quote.pastPortals.length === 1 ? '' : 's'}:{' '}
                  {quote.pastPortals.map((p, i) => (
                    <span key={p.id}>
                      {i ? ', ' : ''}
                      <Link href={`/admin/portals/${p.id}`} className="underline">
                        {formatDate(p.createdAt)}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </Card>

          <Card className="p-5">
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <UserRound className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>
                  <Link href={`/admin/customers/${quote.client.id}`} className="font-medium hover:underline">
                    {quote.client.name}
                  </Link>
                  <span className="block text-[0.8rem] text-muted-foreground">{quote.client.email ?? quote.client.phone}</span>
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>{quote.propertyAddress ?? quote.client.address ?? <span className="text-muted-foreground">No address</span>}</span>
              </li>
            </ul>
            <dl className="mt-4 grid grid-cols-2 gap-y-1 border-t border-border pt-4 text-[0.8rem]">
              <dt className="text-muted-foreground">Created</dt>
              <dd>{formatDate(quote.quoteDate)}</dd>
              <dt className="text-muted-foreground">Synced</dt>
              <dd>{formatDateTime(quote.syncedAt)}</dd>
            </dl>
          </Card>
        </div>
      </div>
    </>
  );
}
