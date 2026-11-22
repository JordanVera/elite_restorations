import { Users } from 'lucide-react';
import Link from 'next/link';

import { ListToolbar } from '@/components/admin/list-toolbar';
import { Pagination, SourceBadge } from '@/components/admin/records';
import { ButtonLink, Card, EmptyState, PageHeader, Table, Td, Th } from '@/components/admin/ui';
import { relativeTime } from '@/lib/activity-labels';
import { customerListParams, listHref } from '@/lib/admin/list-params';
import { listCustomers } from '@/server/admin/records';
import { can } from '@/server/auth/policy';
import { requireAdmin } from '@/server/auth/session';

export const metadata = { title: 'Customers' };

export default async function CustomersPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const admin = await requireAdmin('view_customers');
  const params = customerListParams(await searchParams);
  const { total, rows } = await listCustomers(params);
  const filtered = Boolean(params.q);

  return (
    <>
      <PageHeader
        title="Customers"
        description="Clients synced from Jobber. Edit customer details in Jobber; changes appear here after the next sync."
        actions={
          can(admin.role, 'manage_integrations') ? (
            <ButtonLink href="/admin/settings/integrations" variant="secondary">
              Sync settings
            </ButtonLink>
          ) : null
        }
      />
      <Card>
        <ListToolbar
          placeholder="Search name, email, phone, or address"
          query={params.q}
          selects={[
            {
              name: 'sort',
              label: 'Sort',
              value: params.sort,
              options: [
                { value: 'name', label: 'Name' },
                { value: 'recent', label: 'Recently synced' },
                { value: 'quotes', label: 'Most quotes' },
              ],
            },
          ]}
        />
        {rows.length === 0 ? (
          <EmptyState
            icon={<Users />}
            title={filtered ? 'No customers match' : 'No customers yet'}
            description={
              filtered
                ? 'Try a different name, email, or phone number.'
                : 'Run a sync from Settings > Integrations to import clients from Jobber.'
            }
          />
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <Th>Customer</Th>
                  <Th className="hidden md:table-cell">Contact</Th>
                  <Th className="hidden lg:table-cell">Address</Th>
                  <Th className="text-right">Quotes</Th>
                  <Th className="hidden text-right sm:table-cell">Portals</Th>
                  <Th className="hidden xl:table-cell">Synced</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="group hover:bg-surface-2/40">
                    <Td>
                      <Link href={`/admin/customers/${row.id}`} className="font-medium hover:underline">
                        {row.name}
                      </Link>{' '}
                      <SourceBadge source={row.source} />
                      {row.companyName && row.companyName !== row.name ? (
                        <div className="text-[0.8rem] text-muted-foreground">{row.companyName}</div>
                      ) : null}
                      <div className="text-[0.8rem] text-muted-foreground md:hidden">{row.email ?? row.phone}</div>
                    </Td>
                    <Td className="hidden md:table-cell">
                      <div>{row.email ?? '—'}</div>
                      <div className="text-[0.8rem] text-muted-foreground">{row.phone}</div>
                    </Td>
                    <Td className="hidden max-w-72 text-muted-foreground lg:table-cell">{row.address ?? '—'}</Td>
                    <Td className="text-right tabular-nums">{row.quoteCount}</Td>
                    <Td className="hidden text-right tabular-nums sm:table-cell">{row.portalCount}</Td>
                    <Td className="hidden text-[0.8rem] whitespace-nowrap text-muted-foreground xl:table-cell">
                      {relativeTime(row.syncedAt)}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination
              page={params.page}
              total={total}
              href={(page) => listHref('/admin/customers', { q: params.q, sort: params.sort === 'name' ? '' : params.sort }, { page })}
            />
          </>
        )}
      </Card>
    </>
  );
}
