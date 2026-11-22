"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { joinKeywords } from "@/lib/selections/categories";
import { sanitizeFieldKeys } from "@/lib/selections/fields";
import { logActivity } from "@/server/activity";
import { assertAdmin } from "@/server/auth/session";
import { db } from "@/server/db/client";
import { ensureDefaultCategories } from "@/server/portal/categories";
import { firstIssue } from "@/server/portal/schemas";

const categoryInput = z.object({
  id: z.string().max(40).optional().nullable(),
  name: z.string().trim().min(1, "Add a name.").max(60),
  description: z.string().trim().max(300),
  defaultInstructions: z.string().trim().max(2000),
  enabledFields: z.array(z.string()).max(20).transform(sanitizeFieldKeys),
  keywords: z.string().max(3000),
  excludeKeywords: z.string().max(3000),
  active: z.boolean(),
  sortOrder: z.coerce.number().int().min(0).max(10_000),
});

export type CategoryInput = z.input<typeof categoryInput>;

const splitList = (value: string) => value.split(/[\n,]/).map((v) => v.trim()).filter(Boolean);

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50) || "category"
  );
}

export async function saveCategoryAction(input: CategoryInput): Promise<{ ok: boolean; message: string }> {
  const admin = await assertAdmin("manage_categories");
  const parsed = categoryInput.safeParse(input);
  if (!parsed.success) return { ok: false, message: firstIssue(parsed.error) };
  const data = parsed.data;
  const fields = {
    name: data.name,
    description: data.description || null,
    defaultInstructions: data.defaultInstructions || null,
    enabledFields: data.enabledFields,
    keywords: joinKeywords(splitList(data.keywords), splitList(data.excludeKeywords)),
    active: data.active,
    sortOrder: data.sortOrder,
  };

  let id = data.id ?? null;
  if (id) {
    const updated = await db().selectionCategory.updateMany({ where: { id }, data: fields });
    if (!updated.count) return { ok: false, message: "That category no longer exists." };
  } else {
    let slug = slugify(data.name);
    for (let n = 2; await db().selectionCategory.findUnique({ where: { slug }, select: { id: true } }); n += 1) {
      slug = `${slugify(data.name)}-${n}`;
    }
    id = (await db().selectionCategory.create({ data: { ...fields, slug } })).id;
  }
  await logActivity({
    actorType: "ADMIN",
    actorId: admin.id,
    actorName: admin.name,
    action: "category.saved",
    entityType: "SelectionCategory",
    entityId: id,
    metadata: { title: data.name },
  });
  revalidatePath("/admin/settings/categories");
  return { ok: true, message: `Saved “${data.name}”.` };
}

export async function restoreDefaultCategoriesAction(): Promise<{ ok: boolean; message: string }> {
  await assertAdmin("manage_categories");
  const added = await ensureDefaultCategories();
  revalidatePath("/admin/settings/categories");
  return { ok: true, message: added ? `Added ${added} missing default categor${added === 1 ? "y" : "ies"}.` : "All default categories are already present." };
}
