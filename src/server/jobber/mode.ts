import "server-only";

import { db } from "@/server/db/client";
import { jobberCredentialsReady } from "@/server/jobber/config";

export type JobberMode = "live" | "mock";

/**
 * JOBBER_MODE=mock syncs fixtures instead of calling Jobber. When unset,
 * production is live and everywhere else is mock unless Jobber credentials
 * are present.
 */
export function jobberModeFrom(env: Record<string, string | undefined>, credentialsReady: boolean): JobberMode {
  const explicit = env.JOBBER_MODE?.trim().toLowerCase();
  if (explicit === "mock" || explicit === "live") return explicit;
  if (env.VERCEL_ENV === "production") return "live";
  return credentialsReady ? "live" : "mock";
}

export function jobberMode(): JobberMode {
  return jobberModeFrom(process.env, jobberCredentialsReady());
}

/** The demo banner shows whenever mock records are in the database or mock mode is on. */
export async function jobberDataMode(): Promise<{ mode: JobberMode; showsDemoData: boolean }> {
  const mode = jobberMode();
  if (mode === "mock") return { mode, showsDemoData: true };
  const mockRecords = await db().jobberClient.count({ where: { source: "MOCK" } });
  return { mode, showsDemoData: mockRecords > 0 };
}
