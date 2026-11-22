/** Human-readable sentences for ActivityLog actions. Unknown actions fall back to the raw key. */
const LABELS: Record<string, string> = {
  "admin.login": "signed in",
  "admin.logout": "signed out",
  "admin.account_set": "saved an admin account",
  "jobber.connected": "connected Jobber",
  "jobber.disconnected": "disconnected Jobber",
  "jobber.sync_started": "started a Jobber sync",
  "jobber.sync_finished": "finished a Jobber sync",
  "jobber.sync_failed": "Jobber sync failed",
  "jobber.webhook": "received a Jobber webhook",
  "portal.created": "created a portal",
  "portal.updated": "updated portal settings",
  "portal.resources_updated": "updated shopping resources",
  "portal.published": "published a portal",
  "portal.unpublished": "moved a portal back to draft",
  "portal.revoked": "revoked a portal link",
  "portal.token_regenerated": "regenerated a portal link",
  "portal.deleted": "deleted a draft portal",
  "portal.viewed": "opened the portal",
  "requirement.added": "added a selection",
  "requirement.updated": "edited a selection",
  "requirement.removed": "removed a selection",
  "requirement.reordered": "reordered selections",
  "selection.draft_saved": "saved a draft",
  "selection.submitted": "submitted a selection",
  "selection.approved": "approved a selection",
  "selection.changes_requested": "requested changes",
  "selection.reopened": "reopened a selection",
  "selection.note": "left a note",
  "attachment.uploaded": "uploaded a file",
  "attachment.removed": "removed a file",
  "category.saved": "saved a category template",
  "resource.saved": "saved a shopping resource",
  "resource.deleted": "removed a shopping resource",
};

export function activityLabel(action: string): string {
  return LABELS[action] ?? action;
}

export function actorLabel(actorType: string, actorName: string | null): string {
  if (actorName) return actorName;
  if (actorType === "CUSTOMER") return "Customer";
  if (actorType === "SYSTEM") return "System";
  return "Someone";
}

export function relativeTime(date: Date, now = new Date()): string {
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatDate(date: Date | null | undefined): string {
  if (!date) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/Chicago" });
}

export function formatDateTime(date: Date | null | undefined): string {
  if (!date) return "";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
  });
}

export function formatMoney(value: { toString(): string } | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  const amount = typeof value === "number" ? value : Number(value.toString());
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
