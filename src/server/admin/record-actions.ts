"use server";

import { revalidatePath } from "next/cache";

import { assertAdmin } from "@/server/auth/session";
import { db } from "@/server/db/client";
import { refreshFromJobber } from "@/server/jobber/import";
import { jobberMode } from "@/server/jobber/mode";
import { liveReader, mockReader } from "@/server/jobber/reader";
import { safeLog } from "@/server/safe-log";

import type { ActionResult } from "@/server/admin/integration-actions";

/** Re-reads one quote (and its client and line items) from Jobber. Never writes to Jobber. */
export async function refreshQuoteAction(quoteId: string): Promise<ActionResult> {
  await assertAdmin("manage_portals");
  const quote = await db().jobberQuote.findUnique({ where: { id: quoteId }, select: { jobberId: true, source: true } });
  if (!quote) return { ok: false, message: "Quote not found." };
  if (quote.source === "JOBBER" && jobberMode() !== "live") {
    return { ok: false, message: "Jobber is in demo mode, so live quotes can't be refreshed." };
  }
  try {
    const found = await refreshFromJobber("quote", quote.jobberId, quote.source === "MOCK" ? mockReader() : liveReader());
    revalidatePath(`/admin/quotes/${quoteId}`);
    return found === "saved"
      ? { ok: true, message: "Quote refreshed from Jobber." }
      : { ok: false, message: "Jobber no longer has this quote. Local portals are kept." };
  } catch (error) {
    return { ok: false, message: `Refresh failed: ${safeLog(error)}` };
  }
}
