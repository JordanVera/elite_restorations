import "server-only";

import { TRPCError } from "@trpc/server";

import { publicProcedure } from "@/server/trpc/init";

export function clerkConfigured() {
  return Boolean(process.env.CLERK_SECRET_KEY && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
}

export function devStaffEmail(host: string) {
  if (process.env.NODE_ENV === "production") return null;
  const local = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  const email = process.env.OPPORTUNITY_DEV_AUTH?.trim();
  if (!local || !email?.includes("@")) return null;
  return email;
}

export async function identifyStaff(host: string) {
  const dev = devStaffEmail(host);
  if (dev) return { userId: "dev", email: dev };
  if (!clerkConfigured()) {
    throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Staff sign-in is not configured." });
  }
  const { auth, currentUser } = await import("@clerk/nextjs/server");
  const session = await auth();
  if (!session.userId) throw new TRPCError({ code: "UNAUTHORIZED", message: "Sign in is required." });
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? "";
  const allow = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  if (!allow.includes(email)) {
    throw new TRPCError({ code: "FORBIDDEN", message: "This account is not on the staff allowlist." });
  }
  return { userId: session.userId, email };
}

export const staffProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const staff = await identifyStaff(ctx.host);
  return next({ ctx: { ...ctx, staff } });
});
