"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { logActivity } from "@/server/activity";
import { dummyPasswordHash, verifyPassword } from "@/server/auth/password";
import { LOGIN_WINDOW_MS, loginBlocked, loginKeys, safeAdminRedirect } from "@/server/auth/policy";
import { createAdminSession, destroyAdminSession, getAdmin, requestMeta } from "@/server/auth/session";
import { databaseConfigured, db } from "@/server/db/client";

export type LoginState = { error?: string; email?: string };

const loginSchema = z.object({
  email: z.email().max(254).transform((value) => value.trim().toLowerCase()),
  password: z.string().min(1).max(256),
  next: z.string().max(500).optional(),
});

const GENERIC_ERROR = "That email and password combination is not valid.";

export async function loginAction(_previous: LoginState, formData: FormData): Promise<LoginState> {
  if (!databaseConfigured()) return { error: "The admin database is not configured yet." };

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next") ?? undefined,
  });
  const typedEmail = String(formData.get("email") ?? "").slice(0, 254);
  if (!parsed.success) return { error: GENERIC_ERROR, email: typedEmail };

  const { email, password, next } = parsed.data;
  const { ip } = await requestMeta();
  const keys = loginKeys(ip, email);
  const since = new Date(Date.now() - LOGIN_WINDOW_MS);

  const counts = await Promise.all(
    keys.map((key) => db().loginAttempt.count({ where: { key, success: false, createdAt: { gte: since } } })),
  );
  if (counts.some((count) => loginBlocked(count))) {
    return { error: "Too many attempts. Wait 15 minutes and try again.", email };
  }

  const user = await db().adminUser.findUnique({ where: { email } });
  const ok = await verifyPassword(password, user?.passwordHash ?? (await dummyPasswordHash()));
  const success = Boolean(user && user.active && ok);

  await db().loginAttempt.createMany({ data: keys.map((key) => ({ key, success })) });
  if (!success || !user) return { error: GENERIC_ERROR, email };

  await db().loginAttempt.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } } });
  await db().adminUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await createAdminSession(user.id);
  await logActivity({
    actorType: "ADMIN",
    actorId: user.id,
    actorName: user.name,
    action: "admin.login",
    entityType: "AdminUser",
    entityId: user.id,
  });
  redirect(safeAdminRedirect(next));
}

export async function logoutAction(): Promise<void> {
  const admin = await getAdmin();
  await destroyAdminSession();
  if (admin) {
    await logActivity({
      actorType: "ADMIN",
      actorId: admin.id,
      actorName: admin.name,
      action: "admin.logout",
      entityType: "AdminUser",
      entityId: admin.id,
    });
  }
  redirect("/admin/login");
}
