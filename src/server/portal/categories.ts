import "server-only";

import { CATEGORY_TEMPLATES } from "@/lib/selections/categories";
import { db, type Db } from "@/server/db/client";

/** Inserts missing default templates. Existing categories, including edited ones, are left alone. */
export async function ensureDefaultCategories(client: Db = db()): Promise<number> {
  const result = await client.selectionCategory.createMany({
    data: CATEGORY_TEMPLATES.map((template, index) => ({
      slug: template.slug,
      name: template.name,
      description: template.description,
      defaultInstructions: template.defaultInstructions,
      enabledFields: template.enabledFields,
      keywords: template.keywords,
      sortOrder: (index + 1) * 10,
    })),
    skipDuplicates: true,
  });
  return result.count;
}

export async function listCategories({ activeOnly = false } = {}) {
  const count = await db().selectionCategory.count();
  if (count === 0) await ensureDefaultCategories();
  return db().selectionCategory.findMany({
    where: activeOnly ? { active: true } : {},
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}
