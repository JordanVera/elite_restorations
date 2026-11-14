import "server-only";

import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import { messageFromUnknownError } from "@/lib/contact-identity";

export type Context = {
  ip: string;
};

export function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || req.headers.get("x-real-ip") || "unknown";
}

export function createContext(req: Request): Context {
  return { ip: clientIp(req) };
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    const message = messageFromUnknownError(error);
    return message ? { ...shape, message } : shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
