import Link from 'next/link';

import { ActionButton } from '@/components/admin/action-button';
import { CategoryList } from '@/components/admin/category-editor';
import { PageHeader } from '@/components/admin/ui';
import { requireAdmin } from '@/server/auth/session';
import { db } from '@/server/db/client';
import { restoreDefaultCategoriesAction } from '@/server/portal/category-actions';
import { listCategories } from '@/server/portal/categories';

export const metadata = { title: 'Selection categories' };

export default async function CategoriesPage() {
  await requireAdmin('manage_categories');
  const categories = await listCategories();
  const usage = await db().selectionRequirement.groupBy({ by: ['categoryId'], _count: { _all: true } });
  const counts = new Map(usage.map((u) => [u.categoryId, u._count._all]));

  return (
    <>
      <PageHeader
        eyebrow={
          <Link href="/admin/settings" className="hover:underline">
            Settings
          </Link>
        }
        title="Selection categories"
        description="Templates used when building a portal. Keywords drive the suggestions made from quote line items. Changes apply to new selections; existing portals keep their settings."
        actions={
          <ActionButton action={restoreDefaultCategoriesAction} variant="secondary" size="sm">
            Restore missing defaults
          </ActionButton>
        }
      />
      <CategoryList
        categories={categories.map((c) => ({
          id: c.id,
          name: c.name,
          description: c.description,
          defaultInstructions: c.defaultInstructions,
          enabledFields: c.enabledFields,
          keywords: c.keywords,
          active: c.active,
          sortOrder: c.sortOrder,
          usage: counts.get(c.id) ?? 0,
        }))}
      />
    </>
  );
}
