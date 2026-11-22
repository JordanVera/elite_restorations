/** Whether a customer link works right now. Pure so the rule is tested in one place. */
export type PortalAccess = "open" | "unpublished" | "revoked" | "expired";

export function portalAccess(portal: { status: "DRAFT" | "PUBLISHED" | "REVOKED"; expiresAt: Date | null }, now = new Date()): PortalAccess {
  if (portal.status === "REVOKED") return "revoked";
  if (portal.status !== "PUBLISHED") return "unpublished";
  if (portal.expiresAt && portal.expiresAt.getTime() <= now.getTime()) return "expired";
  return "open";
}
