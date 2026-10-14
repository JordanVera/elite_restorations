-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "SavedPreset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "settings" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedPreset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpportunityRun" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "settings" JSONB NOT NULL,
    "chicagoStart" TEXT NOT NULL,
    "chicagoEnd" TEXT NOT NULL,
    "stageCounts" JSONB NOT NULL,
    "estimatedCostCents" INTEGER NOT NULL DEFAULT 0,
    "reservedCostCents" INTEGER NOT NULL DEFAULT 0,
    "recordedCostCents" INTEGER NOT NULL DEFAULT 0,
    "spendCapCents" INTEGER NOT NULL,
    "shortfallNote" TEXT,
    "partial" BOOLEAN NOT NULL DEFAULT false,
    "workflowRunId" TEXT,
    "reviewToken" TEXT,
    "error" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OpportunityRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" TEXT,
    "sourceUrl" TEXT,
    "attribution" TEXT,
    "retrievedAt" TIMESTAMP(3),
    "usageRestrictions" TEXT,
    "mlsId" TEXT,
    "addressLine" TEXT NOT NULL,
    "unit" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "dedupeKey" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "closedDate" TEXT,
    "saleDateVerified" BOOLEAN NOT NULL DEFAULT false,
    "priceBasis" TEXT NOT NULL,
    "exactSalePrice" INTEGER,
    "askingPrice" INTEGER,
    "priceRangeLow" INTEGER,
    "priceRangeHigh" INTEGER,
    "estimatedValue" INTEGER,
    "yearBuilt" INTEGER,
    "sqft" INTEGER,
    "bedrooms" INTEGER,
    "bathrooms" DOUBLE PRECISION,
    "propertyType" TEXT NOT NULL,
    "description" TEXT,
    "exclusionReason" TEXT,
    "reviewReason" TEXT,
    "opportunityScore" DOUBLE PRECISION,
    "scoreBreakdown" JSONB,
    "scoreExplanation" TEXT,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "rank" INTEGER,
    "duplicateOfId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListingConflict" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "leftValue" TEXT NOT NULL,
    "rightValue" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "ListingConflict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "sourcePhotoId" TEXT,
    "blobPath" TEXT,
    "publicPath" TEXT,
    "sourceUrl" TEXT,
    "contentHash" TEXT,
    "mimeType" TEXT,
    "classification" TEXT NOT NULL DEFAULT 'unclassified',
    "roomId" TEXT,
    "representative" BOOLEAN NOT NULL DEFAULT false,
    "attribution" TEXT,
    "fetchedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "representativePhotoId" TEXT,
    "decision" TEXT,
    "outdatedScore" DOUBLE PRECISION,
    "updatedScore" DOUBLE PRECISION,
    "confidence" DOUBLE PRECISION,
    "explanation" TEXT,
    "observations" JSONB,
    "includeInConcepts" BOOLEAN NOT NULL DEFAULT false,
    "staffOverride" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "roomId" TEXT,
    "photoId" TEXT,
    "cacheKey" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "model" TEXT NOT NULL,
    "promptVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenerationTask" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "attempt" INTEGER NOT NULL DEFAULT 0,
    "reservationId" TEXT,
    "providerRequestId" TEXT,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GenerationTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Concept" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "cacheKey" TEXT NOT NULL,
    "blobPath" TEXT,
    "prompt" TEXT NOT NULL,
    "scopeSummary" JSONB NOT NULL,
    "checkStatus" TEXT NOT NULL,
    "checkNotes" TEXT,
    "model" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Concept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsageRecord" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "estimatedCents" INTEGER,
    "recordedCents" INTEGER,
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "detail" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsageRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpendReservation" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "taskKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpendReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceBookItem" (
    "id" TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "lowCents" INTEGER,
    "highCents" INTEGER,
    "assumptions" TEXT NOT NULL,
    "siteVisitRequired" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PriceBookItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportArtifact" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "blobPath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportArtifact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Listing_runId_status_idx" ON "Listing"("runId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Listing_runId_dedupeKey_key" ON "Listing"("runId", "dedupeKey");

-- CreateIndex
CREATE INDEX "Photo_listingId_idx" ON "Photo"("listingId");

-- CreateIndex
CREATE INDEX "Photo_contentHash_idx" ON "Photo"("contentHash");

-- CreateIndex
CREATE INDEX "Room_listingId_idx" ON "Room"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "Assessment_cacheKey_key" ON "Assessment"("cacheKey");

-- CreateIndex
CREATE UNIQUE INDEX "GenerationTask_idempotencyKey_key" ON "GenerationTask"("idempotencyKey");

-- CreateIndex
CREATE INDEX "GenerationTask_runId_status_idx" ON "GenerationTask"("runId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Concept_cacheKey_key" ON "Concept"("cacheKey");

-- CreateIndex
CREATE UNIQUE INDEX "Concept_roomId_tier_key" ON "Concept"("roomId", "tier");

-- CreateIndex
CREATE INDEX "SpendReservation_runId_status_idx" ON "SpendReservation"("runId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "PriceBookItem_roomType_tier_key" ON "PriceBookItem"("roomType", "tier");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_runId_fkey" FOREIGN KEY ("runId") REFERENCES "OpportunityRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingConflict" ADD CONSTRAINT "ListingConflict_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenerationTask" ADD CONSTRAINT "GenerationTask_runId_fkey" FOREIGN KEY ("runId") REFERENCES "OpportunityRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenerationTask" ADD CONSTRAINT "GenerationTask_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concept" ADD CONSTRAINT "Concept_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsageRecord" ADD CONSTRAINT "UsageRecord_runId_fkey" FOREIGN KEY ("runId") REFERENCES "OpportunityRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpendReservation" ADD CONSTRAINT "SpendReservation_runId_fkey" FOREIGN KEY ("runId") REFERENCES "OpportunityRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportArtifact" ADD CONSTRAINT "ReportArtifact_runId_fkey" FOREIGN KEY ("runId") REFERENCES "OpportunityRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

