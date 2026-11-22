import "server-only";

import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/server/db/generated/client";

export const DATABASE_MISSING = "Database not configured (DATABASE_URL missing)";

export function databaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

/** Neon hosts use the Neon serverless driver. Anything else (local Postgres, CI) uses node-postgres. */
export function adapterKind(url: string): "neon" | "pg" {
  try {
    return new URL(url).hostname.endsWith(".neon.tech") ? "neon" : "pg";
  } catch {
    return "pg";
  }
}

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) throw new Error(DATABASE_MISSING);
  const adapter = adapterKind(url) === "neon" ? new PrismaNeon({ connectionString: url }) : new PrismaPg(url);
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { elitePrisma?: PrismaClient };

/** Lazy so pages that never touch the database still build without DATABASE_URL. */
export function db(): PrismaClient {
  if (!globalForPrisma.elitePrisma) globalForPrisma.elitePrisma = createClient();
  return globalForPrisma.elitePrisma;
}

export type Db = PrismaClient;
export type { Prisma } from "@/server/db/generated/client";
