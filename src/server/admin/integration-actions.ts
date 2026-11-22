"use server";

import { revalidatePath } from "next/cache";

import { logActivity } from "@/server/activity";
import { assertAdmin } from "@/server/auth/session";
import { jobberGraphql } from "@/server/jobber/graphql";
import { purgeMockData, runJobberSync } from "@/server/jobber/import";
import { jobberMode } from "@/server/jobber/mode";
import { missingSchemaFields, SCHEMA_CHECK_QUERY } from "@/server/jobber/queries";
import { liveReader, mockReader } from "@/server/jobber/reader";
import { disconnectJobber } from "@/server/jobber/tokens";
import { deleteFiles } from "@/server/portal/storage";
import { safeLog } from "@/server/safe-log";

export type ActionResult = { ok: boolean; message: string };

function refresh() {
  revalidatePath("/admin", "layout");
}

export async function syncJobberAction(): Promise<ActionResult> {
  const admin = await assertAdmin("manage_integrations");
  const reader = jobberMode() === "mock" ? mockReader() : liveReader();
  const result = await runJobberSync({ reader, startedById: admin.id });
  refresh();
  if (result.status === "FAILED") return { ok: false, message: `Sync failed: ${result.error ?? "unknown error"}` };
  const counts = `${result.clientsSynced} customers and ${result.quotesSynced} quotes`;
  if (result.status === "PARTIAL") return { ok: true, message: `Synced ${counts} so far. Click Sync again to continue.` };
  return {
    ok: true,
    message: reader.source === "MOCK" ? `Loaded demo data: ${counts}.` : `Sync finished: ${counts}.`,
  };
}

export async function disconnectJobberAction(): Promise<ActionResult> {
  const admin = await assertAdmin("manage_integrations");
  await disconnectJobber();
  await logActivity({
    actorType: "ADMIN",
    actorId: admin.id,
    actorName: admin.name,
    action: "jobber.disconnected",
    entityType: "JobberConnection",
    entityId: "jobber",
  });
  refresh();
  return { ok: true, message: "Stored Jobber tokens were removed from this site." };
}

export async function checkJobberSchemaAction(): Promise<ActionResult> {
  await assertAdmin("manage_integrations");
  if (jobberMode() === "mock") return { ok: false, message: "Schema check needs a live Jobber connection." };
  try {
    const result = await jobberGraphql<Parameters<typeof missingSchemaFields>[0]>(SCHEMA_CHECK_QUERY, {}, { retries: 1 });
    const missing = missingSchemaFields(result);
    return missing.length
      ? { ok: false, message: `Jobber's schema is missing fields this site reads: ${missing.join(", ")}` }
      : { ok: true, message: "Every field this site reads exists in the live Jobber schema." };
  } catch (error) {
    return { ok: false, message: `Schema check failed: ${safeLog(error)}` };
  }
}

export async function purgeMockDataAction(): Promise<ActionResult> {
  await assertAdmin("manage_integrations");
  const removed = await purgeMockData();
  await deleteFiles(removed.files);
  refresh();
  return {
    ok: true,
    message: `Removed ${removed.clients} demo customers, ${removed.quotes} demo quotes, and ${removed.portals} demo portals.`,
  };
}
