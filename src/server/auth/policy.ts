/** Pure session, role, and rate-limit rules. No I/O, so they are unit tested directly. */

export type Role = "ADMIN" | "STAFF";

export const SESSION_IDLE_MS = 12 * 60 * 60 * 1000;
export const SESSION_ABSOLUTE_MS = 7 * 24 * 60 * 60 * 1000;
/** lastSeenAt is written at most this often to keep reads cheap. */
export const SESSION_TOUCH_MS = 5 * 60 * 1000;

export const LOGIN_WINDOW_MS = 15 * 60 * 1000;
export const LOGIN_MAX_FAILURES = 5;

/** Production uses the __Host- prefix (Secure, path=/, no Domain). Safari rejects Secure cookies on http://localhost. */
export function sessionCookieName(production = process.env.NODE_ENV === "production"): string {
  return production ? "__Host-er_admin" : "er_admin";
}
export const SESSION_COOKIE_NAMES = ["__Host-er_admin", "er_admin"] as const;

export type SessionTimes = { createdAt: Date; lastSeenAt: Date; expiresAt: Date };

export function newSessionTimes(now = new Date()): SessionTimes {
  return { createdAt: now, lastSeenAt: now, expiresAt: new Date(now.getTime() + SESSION_ABSOLUTE_MS) };
}

export function sessionIsValid(session: SessionTimes, now = new Date()): boolean {
  if (session.expiresAt.getTime() <= now.getTime()) return false;
  return now.getTime() - session.lastSeenAt.getTime() < SESSION_IDLE_MS;
}

export function sessionNeedsTouch(session: SessionTimes, now = new Date()): boolean {
  return now.getTime() - session.lastSeenAt.getTime() >= SESSION_TOUCH_MS;
}

export type Permission =
  | "view_dashboard"
  | "view_customers"
  | "view_financials"
  | "manage_portals"
  | "review_selections"
  | "manage_integrations"
  | "manage_categories"
  | "manage_users";

const STAFF_PERMISSIONS: ReadonlySet<Permission> = new Set([
  "view_dashboard",
  "view_customers",
  "manage_portals",
  "review_selections",
]);

export function can(role: Role, permission: Permission): boolean {
  if (role === "ADMIN") return true;
  return STAFF_PERMISSIONS.has(permission);
}

export function loginKeys(ip: string, email: string): string[] {
  return [`ip:${ip}`, `email:${email.trim().toLowerCase()}`];
}

export function loginBlocked(recentFailures: number, max = LOGIN_MAX_FAILURES): boolean {
  return recentFailures >= max;
}

/** Only same-site relative paths under /admin are allowed after login. */
export function safeAdminRedirect(value: string | null | undefined): string {
  if (!value || !value.startsWith("/admin") || value.startsWith("//") || value.includes("\\")) return "/admin";
  if (value.startsWith("/admin/login")) return "/admin";
  return value;
}
