import "server-only";

import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import ws from "ws";

import { PrismaClient } from "@/generated/prisma/client";

neonConfig.webSocketConstructor = ws;

let client: PrismaClient | null = null;

export function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

function adapterFor(url: string) {
  const host = new URL(url.replace(/^postgres(ql)?:/, "http:")).hostname;
  if (host.endsWith("neon.tech")) return new PrismaNeon({ connectionString: url });
  return new PrismaPg({ connectionString: url });
}

export function getPrisma() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error("Database not configured. Set DATABASE_URL from the Neon Postgres integration.");
  }
  if (!client) {
    client = new PrismaClient({ adapter: adapterFor(url) });
  }
  return client;
}
