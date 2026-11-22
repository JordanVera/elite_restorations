"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { detectLogoKind, MAX_LOGO_BYTES, type LogoKind } from "@/lib/selections/resource-logo";
import { slugifyResourceName } from "@/lib/selections/resources";
import { logActivity } from "@/server/activity";
import { assertAdmin } from "@/server/auth/session";
import { db } from "@/server/db/client";
import { firstIssue } from "@/server/portal/schemas";
import { ensureDefaultResources } from "@/server/portal/resources";

const resourceFields = z.object({
  id: z.string().max(40).optional().nullable(),
  name: z.string().trim().min(1, "Add a name.").max(80),
  url: z
    .string()
    .trim()
    .min(1, "Add a website.")
    .max(300)
    .refine((value) => {
      try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        return false;
      }
    }, "Use a full website address, including https://."),
  recommendedFor: z.string().trim().min(1, "Say what you recommend them for.").max(400),
  location: z.string().trim().max(200),
  categorySlugs: z.array(z.string().trim().min(1).max(60)).max(30),
  active: z.boolean(),
  sortOrder: z.coerce.number().int().min(0).max(10_000),
  removeLogo: z.boolean().default(false),
});

function refreshResourcePages() {
  revalidatePath("/admin/settings/resources");
  revalidatePath("/admin/settings");
  revalidatePath("/admin/portals");
}

function formText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

async function uniqueSlug(base: string, exceptId?: string | null): Promise<string> {
  let slug = base;
  for (let n = 2; ; n += 1) {
    const existing = await db().portalResource.findUnique({ where: { slug }, select: { id: true } });
    if (!existing || existing.id === exceptId) return slug;
    slug = `${base}-${n}`;
  }
}

async function storeResourceLogo(slug: string, bytes: Buffer, kind: LogoKind): Promise<string> {
  const filename = `${slug}.${kind.ext}`;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const result = await put(`supplier-logos/${filename}`, bytes, {
      access: "public",
      contentType: kind.contentType,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return result.url;
  }
  if (process.env.VERCEL) {
    throw new Error("Logo uploads need public Blob storage (BLOB_READ_WRITE_TOKEN).");
  }
  const dest = path.join(process.cwd(), "public", "images", "suppliers", filename);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, bytes);
  return `/images/suppliers/${filename}`;
}

export async function saveResourceAction(formData: FormData): Promise<{ ok: boolean; message: string }> {
  const admin = await assertAdmin("manage_categories");
  const parsed = resourceFields.safeParse({
    id: formText(formData, "id") || null,
    name: formText(formData, "name"),
    url: formText(formData, "url"),
    recommendedFor: formText(formData, "recommendedFor"),
    location: formText(formData, "location"),
    categorySlugs: formData.getAll("categorySlugs").map(String).map((slug) => slug.trim()).filter(Boolean),
    active: formText(formData, "active") === "true",
    sortOrder: formText(formData, "sortOrder") || "0",
    removeLogo: formText(formData, "removeLogo") === "true",
  });
  if (!parsed.success) return { ok: false, message: firstIssue(parsed.error) };
  const data = parsed.data;

  const known = await db().selectionCategory.findMany({ select: { slug: true } });
  const allowed = new Set(known.map((row) => row.slug));
  const categorySlugs = data.categorySlugs.filter((slug) => allowed.has(slug));

  let slug: string;
  if (data.id) {
    const current = await db().portalResource.findUnique({ where: { id: data.id }, select: { slug: true } });
    if (!current) return { ok: false, message: "That resource no longer exists." };
    slug = current.slug;
  } else {
    slug = await uniqueSlug(slugifyResourceName(data.name));
  }

  let logoPath: string | null | undefined;
  if (data.removeLogo) logoPath = null;
  const file = formData.get("logo");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_LOGO_BYTES) return { ok: false, message: "Logos must be 2 MB or smaller." };
    const bytes = Buffer.from(await file.arrayBuffer());
    const kind = detectLogoKind(bytes);
    if (!kind) return { ok: false, message: "Use a PNG, JPEG, WebP, or SVG logo." };
    try {
      logoPath = await storeResourceLogo(slug, bytes, kind);
    } catch (error) {
      return { ok: false, message: error instanceof Error ? error.message : "Could not save the logo." };
    }
  }

  const fields = {
    name: data.name,
    url: data.url,
    recommendedFor: data.recommendedFor,
    location: data.location || null,
    categorySlugs,
    active: data.active,
    sortOrder: data.sortOrder,
    ...(logoPath !== undefined ? { logoPath } : {}),
  };

  const id = data.id
    ? (
        await db().portalResource.update({
          where: { id: data.id },
          data: fields,
          select: { id: true },
        })
      ).id
    : (
        await db().portalResource.create({
          data: { ...fields, slug },
          select: { id: true },
        })
      ).id;

  await logActivity({
    actorType: "ADMIN",
    actorId: admin.id,
    actorName: admin.name,
    action: "resource.saved",
    entityType: "PortalResource",
    entityId: id,
    metadata: { title: data.name },
  });
  refreshResourcePages();
  return { ok: true, message: `Saved “${data.name}”.` };
}

export async function deleteResourceAction(id: string): Promise<{ ok: boolean; message: string }> {
  const admin = await assertAdmin("manage_categories");
  const existing = await db().portalResource.findUnique({ where: { id }, select: { id: true, name: true } });
  if (!existing) return { ok: false, message: "That resource no longer exists." };
  await db().portalResource.delete({ where: { id } });
  await logActivity({
    actorType: "ADMIN",
    actorId: admin.id,
    actorName: admin.name,
    action: "resource.deleted",
    entityType: "PortalResource",
    entityId: id,
    metadata: { title: existing.name },
  });
  refreshResourcePages();
  return { ok: true, message: `Removed “${existing.name}”.` };
}

export async function restoreDefaultResourcesAction(): Promise<{ ok: boolean; message: string }> {
  await assertAdmin("manage_categories");
  const added = await ensureDefaultResources();
  refreshResourcePages();
  return {
    ok: true,
    message: added ? `Added ${added} missing default resource${added === 1 ? "" : "s"}.` : "All default resources are already present.",
  };
}
