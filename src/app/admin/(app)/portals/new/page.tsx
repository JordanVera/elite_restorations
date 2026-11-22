import { redirect } from 'next/navigation';
import Link from 'next/link';

import { NewPortalForm } from '@/components/admin/portal/new-portal-form';
import { EmptyState, PageHeader } from '@/components/admin/ui';
import { can } from '@/server/auth/policy';
import { requireAdmin } from '@/server/auth/session';
import { quoteForNewPortal } from '@/server/portal/admin';

export const metadata = { title: 'New portal' };

export default async function NewPortalPage({ searchParams }: { searchParams: Promise<{ quoteId?: string }> }) {
  const admin = await requireAdmin('manage_portals');
  const { quoteId } = await searchParams;
  const data = quoteId ? await quoteForNewPortal(quoteId) : null;
  if (!data) {
    return (
      <EmptyState
        title="Choose a quote first"
        description="Portals are created from a quote. Open a quote and choose Create Material Selection Portal."
        action={
          <Link href="/admin/quotes" className="underline">
            Go to quotes
          </Link>
        }
      />
    );
  }
  if (data.existingPortalId) redirect(`/admin/portals/${data.existingPortalId}`);

  const firstName = data.quote.client.name.split(' ')[0];
  const project = data.quote.title ?? 'your project';

  return (
    <>
      <PageHeader
        eyebrow={
          <Link href={`/admin/quotes/${data.quote.id}`} className="hover:underline">
            Quote #{data.quote.quoteNumber} · {data.quote.client.name}
          </Link>
        }
        title="Create Material Selection Portal"
        description="Approve the selections this customer needs to make. You can edit, reorder, and add details after creating the draft."
      />
      <NewPortalForm
        quote={{ id: data.quote.id, quoteNumber: data.quote.quoteNumber }}
        suggestions={data.suggestions}
        categories={data.categories.map((c) => ({ id: c.id, name: c.name }))}
        lineItems={data.lineItems}
        canSeeMoney={can(admin.role, 'view_financials')}
        defaultTitle={`${project.charAt(0).toUpperCase()}${project.slice(1)}: material selections`}
        defaultWelcome={`Hi ${firstName}, this is where you'll choose the materials for ${project.toLowerCase()}. Fill in each item below. You can save a draft and come back anytime. When an item looks right, submit it and our team will review it.`}
      />
    </>
  );
}
