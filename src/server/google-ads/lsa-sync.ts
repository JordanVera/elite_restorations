import "server-only";

import { jobberCredentialsReady } from "@/server/jobber/config";
import { googleAdsCredentialsReady, LSA_WATERMARK_PATH } from "@/server/google-ads/config";
import { googleAdsSearch } from "@/server/google-ads/search";
import { acceptInboundLead } from "@/server/leads/accept";
import { blobDedupeStore } from "@/server/leads/dedupe-blob";
import {
  ADS_TIME,
  conversationQuery,
  inboundFromLsa,
  initialWatermark,
  leadQuery,
  leadRowShapeOk,
  messageForLead,
  nextWatermark,
  readConversationRow,
  readLeadRow,
  type LsaConversation,
  type LsaLead,
} from "@/server/leads/lsa";
import { isMissingPrivateBlob, privateBlobConfigured, readPrivateText, writePrivateText } from "@/server/private-blob";
import { safeLog } from "@/server/safe-log";

export type LsaSyncReport = {
  status: "ok" | "failed" | "not-configured";
  created: number;
  duplicate: number;
  failed: number;
  skipped: number;
};

function empty(status: LsaSyncReport["status"]): LsaSyncReport {
  return { status, created: 0, duplicate: 0, failed: 0, skipped: 0 };
}

function notConfiguredMessage(error: unknown): boolean {
  if (isMissingPrivateBlob(error)) return true;
  if (!(error instanceof Error)) return false;
  return (
    error.message === "Google Ads is not connected." ||
    error.message === "Google Ads credentials are not configured." ||
    error.message === "Jobber is not connected." ||
    error.message === "Jobber credentials are not configured."
  );
}

async function readWatermark(): Promise<string | null> {
  const stored = await readPrivateText(LSA_WATERMARK_PATH);
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored.text) as { creationDateTime?: unknown };
    return typeof parsed.creationDateTime === "string" && ADS_TIME.test(parsed.creationDateTime)
      ? parsed.creationDateTime
      : null;
  } catch {
    return null;
  }
}

async function writeWatermark(creationDateTime: string): Promise<void> {
  if (!ADS_TIME.test(creationDateTime)) return;
  await writePrivateText(LSA_WATERMARK_PATH, JSON.stringify({ creationDateTime }));
}

async function importLead(
  lead: LsaLead,
  conversations: LsaConversation[],
  now: Date,
): Promise<"created" | "duplicate" | "failed" | "not-configured" | "skipped"> {
  const message = messageForLead(lead.id, conversations);
  const occurredAt = lead.creationDateTime || now.toISOString();
  const inbound = inboundFromLsa(lead, message, occurredAt);
  if (!inbound) {
    const claim = await blobDedupeStore().claim(`lsa:${lead.id}`);
    return claim === "duplicate" ? "duplicate" : "skipped";
  }
  const status = await acceptInboundLead(inbound);
  return status;
}

export async function syncLsaLeads(now = new Date()): Promise<LsaSyncReport> {
  if (!googleAdsCredentialsReady() || !jobberCredentialsReady() || !privateBlobConfigured()) return empty("not-configured");

  try {
    const since = (await readWatermark()) ?? initialWatermark(now);
    const leadRows = await googleAdsSearch(leadQuery(since));
    const conversationRows = await googleAdsSearch(conversationQuery(since));
    const leads = leadRows.map(readLeadRow).filter((lead): lead is LsaLead => lead !== null);
    if (leadRows.length > 0 && (leads.length === 0 || !leadRows.some(leadRowShapeOk))) {
      console.error("[lsa] search rows were not readable", leadRows.length);
      return { ...empty("failed"), failed: leadRows.length };
    }
    const conversations = conversationRows
      .map(readConversationRow)
      .filter((row): row is LsaConversation => row !== null);
    leads.sort((a, b) => (a.creationDateTime || "9999").localeCompare(b.creationDateTime || "9999"));

    const report = empty("ok");
    let checkpoint: string | null = null;
    for (const lead of leads) {
      const outcome = await importLead(lead, conversations, now);
      if (outcome === "failed" || outcome === "not-configured") {
        if (outcome === "failed") report.failed += 1;
        if (checkpoint) await writeWatermark(checkpoint);
        return { ...report, status: outcome === "not-configured" ? "not-configured" : "failed" };
      }
      if (outcome === "created") report.created += 1;
      else if (outcome === "duplicate") report.duplicate += 1;
      else report.skipped += 1;
      if (lead.creationDateTime) checkpoint = lead.creationDateTime;
    }

    await writeWatermark(nextWatermark(checkpoint, now));
    console.info("[lsa] sync", report.created, report.duplicate, report.failed, report.skipped);
    return report;
  } catch (error) {
    if (notConfiguredMessage(error)) {
      console.info("[lsa]", safeLog(error));
      return empty("not-configured");
    }
    console.error("[lsa] sync failed", safeLog(error));
    return { ...empty("failed"), failed: 1 };
  }
}
