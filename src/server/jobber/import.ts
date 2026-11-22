import "server-only";

import { logActivity } from "@/server/activity";
import { db } from "@/server/db/client";
import type { Prisma } from "@/server/db/generated/client";
import { mapClient, mapLineItems, mapQuote, type ClientRow, type QuoteNode } from "@/server/jobber/read-map";
import type { JobberReader } from "@/server/jobber/reader";
import { safeLog } from "@/server/safe-log";

type Source = "JOBBER" | "MOCK";
type Tx = Prisma.TransactionClient;

async function upsertClient(tx: Tx, row: ClientRow, source: Source): Promise<string> {
  const data = { ...row, source, syncedAt: new Date() };
  const saved = await tx.jobberClient.upsert({
    where: { jobberId: row.jobberId },
    create: data,
    update: data,
    select: { id: true },
  });
  return saved.id;
}

/** Saves one quote with its client and every line item. Line items removed in Jobber are removed here. */
export async function saveQuoteNode(node: QuoteNode, reader: JobberReader): Promise<void> {
  const mapped = mapQuote(node);
  const lineItems = [...mapped.lineItems];
  let cursor = mapped.moreLineItems;
  while (cursor) {
    const next = await reader.quoteLineItemsPage(node.id, cursor);
    lineItems.push(...mapLineItems(next.nodes, lineItems.length));
    cursor = next.pageInfo.hasNextPage ? next.pageInfo.endCursor : null;
  }

  await db().$transaction(async (tx) => {
    let clientId: string | undefined;
    if (mapped.client) {
      clientId = await upsertClient(tx, mapped.client, reader.source);
    } else {
      clientId = (await tx.jobberClient.findUnique({ where: { jobberId: mapped.quote.clientJobberId }, select: { id: true } }))?.id;
      if (!clientId) {
        const client = await reader.client(mapped.quote.clientJobberId);
        if (!client) throw new Error(`Client for quote ${mapped.quote.quoteNumber} was not found.`);
        clientId = await upsertClient(tx, mapClient(client), reader.source);
      }
    }

    const q = mapped.quote;
    const quoteData = {
      jobberId: q.jobberId,
      quoteNumber: q.quoteNumber,
      title: q.title,
      status: q.status,
      quoteDate: q.quoteDate,
      total: q.total,
      propertyAddress: q.propertyAddress,
      jobberWebUri: q.jobberWebUri,
      clientId,
      source: reader.source,
      syncedAt: new Date(),
    };
    const quote = await tx.jobberQuote.upsert({
      where: { jobberId: mapped.quote.jobberId },
      create: quoteData,
      update: quoteData,
      select: { id: true },
    });

    for (const item of lineItems) {
      const data = { ...item, quoteId: quote.id };
      await tx.jobberQuoteLineItem.upsert({ where: { jobberId: item.jobberId }, create: data, update: data });
    }
    await tx.jobberQuoteLineItem.deleteMany({
      where: { quoteId: quote.id, jobberId: { notIn: lineItems.map((item) => item.jobberId) } },
    });
  });
}

export async function saveClientNode(node: Parameters<typeof mapClient>[0], reader: JobberReader): Promise<void> {
  await db().$transaction((tx) => upsertClient(tx, mapClient(node), reader.source));
}

export type SyncOutcome = {
  runId: string;
  status: "SUCCEEDED" | "PARTIAL" | "FAILED";
  clientsSynced: number;
  quotesSynced: number;
  error?: string;
};

const RESUME_WINDOW_MS = 6 * 60 * 60 * 1000;

/**
 * Full read sync: clients, then quotes with line items. Runs until the time
 * budget is used, then saves the cursor and returns PARTIAL. Calling again
 * resumes from the saved cursor.
 */
export async function runJobberSync(options: {
  reader: JobberReader;
  startedById?: string | null;
  budgetMs?: number;
  now?: () => number;
}): Promise<SyncOutcome> {
  const { reader } = options;
  const now = options.now ?? Date.now;
  const deadline = now() + (options.budgetMs ?? 40_000);
  const prisma = db();

  let run = await prisma.jobberSyncRun.findFirst({
    where: {
      source: reader.source,
      status: { in: ["RUNNING", "PARTIAL"] },
      startedAt: { gt: new Date(now() - RESUME_WINDOW_MS) },
    },
    orderBy: { startedAt: "desc" },
  });
  if (run) {
    run = await prisma.jobberSyncRun.update({ where: { id: run.id }, data: { status: "RUNNING", error: null } });
  } else {
    run = await prisma.jobberSyncRun.create({
      data: { kind: "full", source: reader.source, phase: "clients", startedById: options.startedById ?? null },
    });
    await logActivity({
      actorType: options.startedById ? "ADMIN" : "SYSTEM",
      actorId: options.startedById ?? null,
      action: "jobber.sync_started",
      entityType: "JobberSyncRun",
      entityId: run.id,
      metadata: { source: reader.source },
    });
  }

  let phase = run.phase ?? "clients";
  let cursor = run.cursor;
  let clientsSynced = run.clientsSynced;
  let quotesSynced = run.quotesSynced;

  const checkpoint = (status: "RUNNING" | "PARTIAL" | "SUCCEEDED" | "FAILED", error?: string) =>
    prisma.jobberSyncRun.update({
      where: { id: run.id },
      data: {
        phase,
        cursor,
        clientsSynced,
        quotesSynced,
        status,
        error: error ?? null,
        finishedAt: status === "SUCCEEDED" || status === "FAILED" ? new Date() : null,
      },
    });

  try {
    while (phase !== "done") {
      if (now() >= deadline) {
        await checkpoint("PARTIAL");
        return { runId: run.id, status: "PARTIAL", clientsSynced, quotesSynced };
      }
      if (phase === "clients") {
        const page = await reader.clientsPage(cursor);
        await prisma.$transaction(async (tx) => {
          for (const node of page.nodes) await upsertClient(tx, mapClient(node), reader.source);
        });
        clientsSynced += page.nodes.length;
        cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
        if (!cursor) phase = "quotes";
      } else {
        const page = await reader.quotesPage(cursor);
        for (const node of page.nodes) {
          await saveQuoteNode(node, reader);
          quotesSynced += 1;
        }
        cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
        if (!cursor) phase = "done";
      }
      await checkpoint("RUNNING");
    }
    await checkpoint("SUCCEEDED");
    await logActivity({
      actorType: options.startedById ? "ADMIN" : "SYSTEM",
      actorId: options.startedById ?? null,
      action: "jobber.sync_finished",
      entityType: "JobberSyncRun",
      entityId: run.id,
      metadata: { clientsSynced, quotesSynced, source: reader.source },
    });
    return { runId: run.id, status: "SUCCEEDED", clientsSynced, quotesSynced };
  } catch (error) {
    const message = safeLog(error);
    console.error("[jobber] read sync failed", message);
    await checkpoint("FAILED", message);
    await logActivity({
      actorType: "SYSTEM",
      action: "jobber.sync_failed",
      entityType: "JobberSyncRun",
      entityId: run.id,
      metadata: { error: message },
    });
    return { runId: run.id, status: "FAILED", clientsSynced, quotesSynced, error: message };
  }
}

/** Re-fetches one quote or client after a webhook. */
export async function refreshFromJobber(kind: "quote" | "client", id: string, reader: JobberReader): Promise<"saved" | "missing"> {
  if (kind === "quote") {
    const node = await reader.quote(id);
    if (!node) return "missing";
    await saveQuoteNode(node, reader);
    return "saved";
  }
  const node = await reader.client(id);
  if (!node) return "missing";
  await saveClientNode(node, reader);
  return "saved";
}

/** Removes mock customers and quotes, and any portal built on them. Real Jobber records are untouched. */
/** Returns the stored upload paths so the caller can delete the files after the rows are gone. */
export async function purgeMockData(): Promise<{ clients: number; quotes: number; portals: number; files: string[] }> {
  return db().$transaction(async (tx) => {
    const quotes = await tx.jobberQuote.findMany({ where: { source: "MOCK" }, select: { id: true } });
    const quoteIds = quotes.map((q) => q.id);
    const attachments = await tx.attachment.findMany({
      where: { selection: { requirement: { portal: { quoteId: { in: quoteIds } } } } },
      select: { blobPathname: true },
    });
    const portals = await tx.customerPortal.deleteMany({ where: { quoteId: { in: quoteIds } } });
    await tx.jobberQuote.deleteMany({ where: { id: { in: quoteIds } } });
    const clients = await tx.jobberClient.deleteMany({ where: { source: "MOCK", quotes: { none: {} } } });
    await tx.jobberSyncRun.deleteMany({ where: { source: "MOCK" } });
    return { clients: clients.count, quotes: quoteIds.length, portals: portals.count, files: attachments.map((a) => a.blobPathname) };
  });
}
