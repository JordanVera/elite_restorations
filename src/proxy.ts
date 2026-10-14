import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdmin = createRouteMatcher(["/admin(.*)"]);
const isSignIn = createRouteMatcher(["/admin/sign-in(.*)"]);

const clerkConfigured = Boolean(process.env.CLERK_SECRET_KEY && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default clerkConfigured
  ? clerkMiddleware(async (auth, request) => {
      if (isAdmin(request) && !isSignIn(request)) await auth.protect();
    })
  : function proxy() {
      return NextResponse.next();
    };

export const config = {
  matcher: ["/admin(.*)", "/api/trpc(.*)", "/api/admin(.*)"],
};
