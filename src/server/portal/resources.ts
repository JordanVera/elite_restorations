import "server-only";

import { PORTAL_RESOURCES, type PortalResource } from "@/lib/selections/resources";
import { db, type Db } from "@/server/db/client";

function toResource(row: {
  slug: string;
  name: string;
  url: string;
  recommendedFor: string;
  location: string | null;
  logoPath: string | null;
  categorySlugs: string[];
  active: boolean;
}): PortalResource {
  return {
    slug: row.slug,
    name: row.name,
    url: row.url,
    recommendedFor: row.recommendedFor,
    location: row.location,
    logoPath: row.logoPath,
    categorySlugs: row.categorySlugs,
    active: row.active,
  };
}

/** Inserts missing default suppliers. Existing rows, including edited ones, are left alone. */
export async function ensureDefaultResources(client: Db = db()): Promise<number> {
  const result = await client.portalResource.createMany({
    data: PORTAL_RESOURCES.map((resource, index) => ({
      slug: resource.slug,
      name: resource.name,
      url: resource.url,
      recommendedFor: resource.recommendedFor,
      location: resource.location ?? null,
      logoPath: resource.logoPath ?? null,
      categorySlugs: [...resource.categorySlugs],
      sortOrder: (index + 1) * 10,
    })),
    skipDuplicates: true,
  });
  return result.count;
}

export async function listPortalResources({ activeOnly = false } = {}): Promise<PortalResource[]> {
  const count = await db().portalResource.count();
  if (count === 0) await ensureDefaultResources();
  const rows = await db().portalResource.findMany({
    where: activeOnly ? { active: true } : {},
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  return rows.map(toResource);
}

export async function listPortalResourceRows() {
  const count = await db().portalResource.count();
  if (count === 0) await ensureDefaultResources();
  return db().portalResource.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}
