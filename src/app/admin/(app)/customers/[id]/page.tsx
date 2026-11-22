import { ExternalLink, FileText, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PortalStatusBadge, SourceBadge } from '@/components/admin/records';
import { Badge, Card, CardHeader, EmptyState, PageHeader, Table, Td, Th } from '@/components/admin/ui';
import { formatDate, formatMoney, formatDateTime } from '@/lib/activity-labels';
import { getCustomer } from '@/server/admin/records';
import { can } from '@/server/auth/policy';
import { requireAdmin } from '@/server/auth/session';
import { quoteStatusLabel } from '@/server/jobber/queries';

export const metadata = { title: 'Customer' };

export default async function CustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin('view_customers');
  const { id } = await params;
  const customer = await getCustomer(id);
  if (!customer) notFound();
  const showTotals = can(admin.role, 'view_financials');

  return (
    <>
      <PageHeader
        eyebrow={
          <Link href="/admin/customers" className="hover:underline">
            Customers
          </Link>
        }
        title={
          <span className="flex flex-wrap items-center gap-2">
            {customer.name} <SourceBadge source={customer.source} />
          </span>
        }
        description={customer.companyName && customer.companyName !== customer.name ? customer.companyName : undefined}
        actions={
          customer.jobberWebUri && customer.source === 'JOBBER' ? (
            <a
              href={customer.jobberWebUri}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-[8px] border border-input bg-white px-4 text-sm font-medium hover:bg-surface-2"
            >
              Open in Jobber <ExternalLink className="size-4" />
            </a>
          ) : null
        }
      />

      <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
        <Card className="h-fit p-5">
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              {customer.email ? (
                <a href={`mailto:${customer.email}`} className="break-all hover:underline">
                  {customer.email}
                </a>
              ) : (
                <span className="text-muted-foreground">No email</span>
              )}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              {customer.phone ? (
                <a href={`tel:${customer.phone}`} className="hover:underline">
                  {customer.phone}
                </a>
              ) : (
                <span className="text-muted-foreground">No phone</span>
              )}
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span>{customer.address ?? <span className="text-muted-foreground">No address</span>}</span>
            </li>
          </ul>
          <p className="mt-5 border-t border-border pt-4 text-[0.8rem] text-muted-foreground">
            Synced {formatDateTime(customer.syncedAt)}. Read-only here; edit in Jobber.
          </p>
        </Card>

        <Card>
          <CardHeader title="Quotes" description={`${customer.quotes.length} from Jobber`} />
          {customer.quotes.length === 0 ? (
            <EmptyState icon={<FileText />} title="No quotes" description="Quotes created in Jobber appear here after a sync." />
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Quote</Th>
                  <Th>Status</Th>
                  <Th className="hidden md:table-cell">Date</Th>
                  {showTotals ? <Th className="hidden text-right sm:table-cell">Total</Th> : null}
                  <Th>Material portal</Th>
                </tr>
              </thead>
              <tbody>
                {customer.quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-surface-2/40">
                    <Td>
                      <Link href={`/admin/quotes/${quote.id}`} className="font-medium hover:underline">
                        #{quote.quoteNumber}
                      </Link>
                      <div className="text-[0.8rem] text-muted-foreground">{quote.title ?? quote.propertyAddress}</div>
                    </Td>
                    <Td>
                      <Badge>{quoteStatusLabel(quote.status)}</Badge>
                    </Td>
                    <Td className="hidden whitespace-nowrap text-muted-foreground md:table-cell">{formatDate(quote.quoteDate)}</Td>
                    {showTotals ? (
                      <Td className="hidden text-right tabular-nums sm:table-cell">{formatMoney(quote.total)}</Td>
                    ) : null}
                    <Td>
                      <PortalStatusBadge portal={quote.portal} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      </div>
    </>
  );
}
