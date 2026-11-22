import "server-only";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import {
  can,
  newSessionTimes,
  SESSION_COOKIE_NAMES,
  sessionCookieName,
  sessionIsValid,
  sessionNeedsTouch,
  type Permission,
  type Role,
} from "@/server/auth/policy";
import { db } from "@/server/db/client";
import { randomToken, sha256 } from "@/server/security/crypto";

export type AdminIdentity = {
  id: string;
  email: string;
  name: string;
  role: Role;
  sessionId: string;
};

export async function requestMeta(): Promise<{ ip: string; userAgent: string }> {
  const list = await headers();
  const forwarded = list.get("x-forwarded-for")?.split(",")[0]?.trim();
  return {
    ip: forwarded || list.get("x-real-ip") || "unknown",
    userAgent: (list.get("user-agent") ?? "").slice(0, 300),
  };
}

export async function createAdminSession(userId: string): Promise<void> {
  const token = randomToken();
  const times = newSessionTimes();
  const meta = await requestMeta();
  await db().adminSession.create({
    data: { tokenHash: sha256(token), userId, ...times, ip: meta.ip, userAgent: meta.userAgent },
  });
  const jar = await cookies();
  jar.set({
    name: sessionCookieName(),
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: times.expiresAt,
  });
}

async function readSessionToken(): Promise<string | null> {
  const jar = await cookies();
  for (const name of SESSION_COOKIE_NAMES) {
    const value = jar.get(name)?.value;
    if (value) return value;
  }
  return null;
}

/** Current admin, or null. Cached for the duration of one request. */
export const getAdmin = cache(async (): Promise<AdminIdentity | null> => {
  const token = await readSessionToken();
  if (!token) return null;
  const session = await db().adminSession.findUnique({
    where: { tokenHash: sha256(token) },
    include: { user: true },
  });
  if (!session || !session.user.active || !sessionIsValid(session)) return null;
  if (sessionNeedsTouch(session)) {
    await db()
      .adminSession.update({ where: { id: session.id }, data: { lastSeenAt: new Date() } })
      .catch(() => undefined);
  }
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role,
    sessionId: session.id,
  };
});

/** For pages and layouts. Redirects to the login page when there is no valid session. */
export async function requireAdmin(permission?: Permission): Promise<AdminIdentity> {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  if (permission && !can(admin.role, permission)) redirect("/admin?denied=1");
  return admin;
}

export class AuthError extends Error {
  constructor(message = "You are not signed in or do not have permission.") {
    super(message);
    this.name = "AuthError";
  }
}

/** For server actions and route handlers. Throws instead of redirecting. */
export async function assertAdmin(permission?: Permission): Promise<AdminIdentity> {
  const admin = await getAdmin();
  if (!admin) throw new AuthError();
  if (permission && !can(admin.role, permission)) throw new AuthError("You do not have permission to do that.");
  return admin;
}

export async function destroyAdminSession(): Promise<void> {
  const token = await readSessionToken();
  if (token) await db().adminSession.deleteMany({ where: { tokenHash: sha256(token) } });
  const jar = await cookies();
  for (const name of SESSION_COOKIE_NAMES) {
    if (!jar.get(name)) continue;
    // __Host- cookies can only be cleared by a Secure Set-Cookie with path=/.
    jar.set({ name, value: "", path: "/", maxAge: 0, httpOnly: true, sameSite: "lax", secure: name.startsWith("__Host-") });
  }
}
