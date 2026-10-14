import "server-only";

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getRun, resumeHook, start } from "workflow/api";

import { databaseConfigured, getPrisma } from "@/server/db";
import { openaiConfigured } from "@/server/opportunities/analyze";
import { privateBlobConfigured } from "@/server/opportunities/blob";
import { DEMO_NOTICE, demoListings } from "@/server/opportunities/demo";
import { parseImportCsv, parseImportJson } from "@/server/opportunities/import-listings";
import { providerStatuses } from "@/server/opportunities/providers";
import {
  createRun,
  ensurePriceBook,
  loadRun,
  rankAndSelect,
  screenListings,
  seedImported,
} from "@/server/opportunities/repository";
import { opportunityWorkflow } from "@/server/opportunities/run-workflow";
import { estimateFromSettings } from "@/server/opportunities/spending";
import { defaultSettings, runSettingsSchema } from "@/server/opportunities/settings";
import { router } from "@/server/trpc/init";
import { staffProcedure } from "@/server/trpc/staff";

const settingsInput = runSettingsSchema;

async function launch(runId: string) {
  const prisma = getPrisma();
  try {
    const workflow = await start(opportunityWorkflow, [runId]);
    await prisma.opportunityRun.update({ where: { id: runId }, data: { workflowRunId: workflow.runId, status: "running" } });
  } catch (error) {
    await prisma.opportunityRun.update({
      where: { id: runId },
      data: { error: error instanceof Error ? error.message : "The background run did not start." },
    });
  }
}

export const opportunitiesRouter = router({
  overview: staffProcedure.query(async () => {
    const providers = providerStatuses();
    const settings = defaultSettings();
    if (!databaseConfigured()) {
      return {
        database: false,
        openai: openaiConfigured(),
        privateBlob: privateBlobConfigured(),
        providers,
        presets: [],
        runs: [],
        priceBook: [],
        estimate: estimateFromSettings(settings),
        defaults: settings,
        demoNotice: DEMO_NOTICE,
      };
    }
    const prisma = getPrisma();
    await ensurePriceBook();
    const [presets, runs, priceBook] = await Promise.all([
      prisma.savedPreset.findMany({ orderBy: { updatedAt: "desc" } }),
      prisma.opportunityRun.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
      prisma.priceBookItem.findMany({ orderBy: [{ roomType: "asc" }, { tier: "asc" }] }),
    ]);
    return {
      database: true,
      openai: openaiConfigured(),
      privateBlob: privateBlobConfigured(),
      providers,
      presets,
      runs,
      priceBook,
      estimate: estimateFromSettings(settings),
      defaults: settings,
      demoNotice: DEMO_NOTICE,
    };
  }),

  savePreset: staffProcedure.input(z.object({ id: z.string().optional(), name: z.string().min(1), settings: settingsInput })).mutation(async ({ input }) => {
    const prisma = getPrisma();
    if (input.id) {
      return prisma.savedPreset.update({ where: { id: input.id }, data: { name: input.name, settings: input.settings } });
    }
    return prisma.savedPreset.create({ data: { name: input.name, settings: input.settings } });
  }),

  savePrice: staffProcedure
    .input(z.object({ id: z.string(), lowCents: z.number().int().nullable(), highCents: z.number().int().nullable(), assumptions: z.string(), siteVisitRequired: z.boolean() }))
    .mutation(async ({ input }) => {
      return getPrisma().priceBookItem.update({
        where: { id: input.id },
        data: {
          lowCents: input.lowCents,
          highCents: input.highCents,
          assumptions: input.assumptions,
          siteVisitRequired: input.siteVisitRequired,
        },
      });
    }),

  create: staffProcedure.input(z.object({ name: z.string().min(1), settings: settingsInput })).mutation(async ({ input, ctx }) => {
    const run = await createRun({ name: input.name, origin: "live", settings: input.settings, createdBy: ctx.staff.email });
    await launch(run.id);
    return { id: run.id };
  }),

  importListings: staffProcedure.input(z.object({ name: z.string().min(1), settings: settingsInput, format: z.enum(["json", "csv"]), body: z.string() })).mutation(async ({ input, ctx }) => {
    const parsed = input.format === "json" ? parseImportJson(JSON.parse(input.body)) : parseImportCsv(input.body);
    const run = await createRun({ name: input.name, origin: "import", settings: input.settings, createdBy: ctx.staff.email });
    await seedImported(run.id, parsed.listings, "import");
    await launch(run.id);
    return { id: run.id };
  }),

  demo: staffProcedure.input(z.object({ settings: settingsInput })).mutation(async ({ input, ctx }) => {
    const run = await createRun({ name: "Demo dataset", origin: "demo", settings: input.settings, createdBy: ctx.staff.email });
    await seedImported(run.id, demoListings, "demo");
    await screenListings(run.id);
    await rankAndSelect(run.id);
    await launch(run.id);
    return { id: run.id, notice: DEMO_NOTICE };
  }),

  detail: staffProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const run = await loadRun(input.id);
    if (!run) throw new TRPCError({ code: "NOT_FOUND", message: "That run was not found." });
    return run;
  }),

  correctRoom: staffProcedure
    .input(z.object({
      roomId: z.string(),
      roomType: z.enum(["kitchen", "bathroom"]).optional(),
      decision: z.enum(["outdated", "updated_appearance", "mixed", "insufficient_evidence"]).optional(),
      includeInConcepts: z.boolean().optional(),
      representativePhotoId: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return getPrisma().room.update({
        where: { id: input.roomId },
        data: {
          roomType: input.roomType,
          decision: input.decision,
          includeInConcepts: input.includeInConcepts,
          representativePhotoId: input.representativePhotoId,
          staffOverride: true,
        },
      });
    }),

  overrideListing: staffProcedure.input(z.object({ listingId: z.string(), status: z.enum(["qualified", "excluded", "review"]), reason: z.string() })).mutation(async ({ input }) => {
    return getPrisma().listing.update({
      where: { id: input.listingId },
      data: {
        status: input.status,
        selected: input.status === "qualified",
        exclusionReason: input.status === "excluded" ? input.reason : null,
        reviewReason: input.status === "review" ? input.reason : null,
      },
    });
  }),

  cancel: staffProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    const prisma = getPrisma();
    const run = await prisma.opportunityRun.findUnique({ where: { id: input.id } });
    if (!run) throw new TRPCError({ code: "NOT_FOUND", message: "That run was not found." });
    if (run.workflowRunId) {
      const workflow = getRun(run.workflowRunId);
      if (await workflow.exists) await workflow.cancel({ cancelReason: "Cancelled by staff" });
    }
    await prisma.opportunityRun.update({ where: { id: input.id }, data: { status: "cancelled" } });
    return { ok: true };
  }),

  resume: staffProcedure.input(z.object({ id: z.string(), approved: z.boolean() })).mutation(async ({ input }) => {
    const run = await getPrisma().opportunityRun.findUnique({ where: { id: input.id } });
    if (!run?.reviewToken) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "This run is not waiting for review." });
    await resumeHook(run.reviewToken, { approved: input.approved });
    await getPrisma().opportunityRun.update({
      where: { id: input.id },
      data: { status: input.approved ? "running" : "cancelled" },
    });
    return { ok: true };
  }),

  regenerate: staffProcedure.input(z.object({ conceptId: z.string() })).mutation(async ({ input }) => {
    const prisma = getPrisma();
    const concept = await prisma.concept.findUnique({ where: { id: input.conceptId }, include: { room: { include: { listing: true } } } });
    if (!concept) throw new TRPCError({ code: "NOT_FOUND", message: "That concept was not found." });
    await prisma.concept.delete({ where: { id: concept.id } });
    await prisma.generationTask.deleteMany({ where: { roomId: concept.roomId, tier: concept.tier } });
    const { generateRun } = await import("@/server/opportunities/pipeline-run");
    await generateRun(concept.room.listing.runId);
    return { ok: true };
  }),
});
