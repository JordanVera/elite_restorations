import Link from 'next/link';

import { ActionButton } from '@/components/admin/action-button';
import { ResourceList } from '@/components/admin/resource-editor';
import { PageHeader } from '@/components/admin/ui';
import { requireAdmin } from '@/server/auth/session';
import { listCategories } from '@/server/portal/categories';
import { restoreDefaultResourcesAction } from '@/server/portal/resource-actions';
import { listPortalResourceRows } from '@/server/portal/resources';

export const metadata = { title: 'Shopping resources' };

export default async function ResourcesSettingsPage() {
  await requireAdmin('manage_categories');
  const [resources, categories] = await Promise.all([listPortalResourceRows(), listCategories()]);

  return (
    <>
      <PageHeader
        eyebrow={
          <Link href="/admin/settings" className="hover:underline">
            Settings
          </Link>
        }
        title="Shopping resources"
        description="Stores and yards shown on customer portals. Match each one to the selection categories it should be suggested for. You can add a new supplier anytime."
        actions={
          <ActionButton action={restoreDefaultResourcesAction} variant="secondary" size="sm">
            Restore missing defaults
          </ActionButton>
        }
      />
      <ResourceList
        resources={resources.map((row) => ({
          id: row.id,
          slug: row.slug,
          name: row.name,
          url: row.url,
          recommendedFor: row.recommendedFor,
          location: row.location,
          logoPath: row.logoPath,
          categorySlugs: row.categorySlugs,
          active: row.active,
          sortOrder: row.sortOrder,
        }))}
        categories={categories.map((category) => ({ slug: category.slug, name: category.name }))}
      />
    </>
  );
}
