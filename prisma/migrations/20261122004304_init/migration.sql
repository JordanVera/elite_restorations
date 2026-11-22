-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('ADMIN', 'STAFF');

-- CreateEnum
CREATE TYPE "JobberConnectionStatus" AS ENUM ('CONNECTED', 'NEEDS_RECONNECT', 'DISCONNECTED');

-- CreateEnum
CREATE TYPE "RecordSource" AS ENUM ('JOBBER', 'MOCK');

-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('RUNNING', 'PARTIAL', 'SUCCEEDED', 'FAILED');

-- CreateEnum
CREATE TYPE "PortalStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'REVOKED');

-- CreateEnum
CREATE TYPE "SelectionStatus" AS ENUM ('NOT_STARTED', 'DRAFT', 'SUBMITTED', 'CHANGES_REQUESTED', 'APPROVED');

-- CreateEnum
CREATE TYPE "UploadedBy" AS ENUM ('CUSTOMER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ReviewDecision" AS ENUM ('APPROVED', 'CHANGES_REQUESTED', 'REOPENED', 'NOTE');

-- CreateEnum
CREATE TYPE "ActorType" AS ENUM ('ADMIN', 'CUSTOMER', 'SYSTEM');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'STAFF',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminSession" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginAttempt" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobberConnection" (
    "id" TEXT NOT NULL DEFAULT 'jobber',
    "accessTokenEncrypted" TEXT NOT NULL,
    "refreshTokenEncrypted" TEXT NOT NULL,
    "accessTokenExpiresAt" TIMESTAMP(3) NOT NULL,
    "scopes" TEXT,
    "accountId" TEXT,
    "accountName" TEXT,
    "status" "JobberConnectionStatus" NOT NULL DEFAULT 'CONNECTED',
    "lastError" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "connectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobberConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobberSyncRun" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "status" "SyncStatus" NOT NULL DEFAULT 'RUNNING',
    "source" "RecordSource" NOT NULL,
    "cursor" TEXT,
    "phase" TEXT,
    "clientsSynced" INTEGER NOT NULL DEFAULT 0,
    "quotesSynced" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "startedById" TEXT,

    CONSTRAINT "JobberSyncRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobberClient" (
    "id" TEXT NOT NULL,
    "jobberId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "jobberWebUri" TEXT,
    "source" "RecordSource" NOT NULL DEFAULT 'JOBBER',
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobberClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobberQuote" (
    "id" TEXT NOT NULL,
    "jobberId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "quoteNumber" TEXT NOT NULL,
    "title" TEXT,
    "status" TEXT NOT NULL,
    "quoteDate" TIMESTAMP(3),
    "total" DECIMAL(12,2),
    "propertyAddress" TEXT,
    "jobberWebUri" TEXT,
    "source" "RecordSource" NOT NULL DEFAULT 'JOBBER',
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobberQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobberQuoteLineItem" (
    "id" TEXT NOT NULL,
    "jobberId" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "quantity" DECIMAL(12,2),
    "unitPrice" DECIMAL(12,2),
    "totalPrice" DECIMAL(12,2),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "JobberQuoteLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectionCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "defaultInstructions" TEXT,
    "enabledFields" TEXT[],
    "keywords" TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SelectionCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerPortal" (
    "id" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "tokenEncrypted" TEXT NOT NULL,
    "status" "PortalStatus" NOT NULL DEFAULT 'DRAFT',
    "title" TEXT NOT NULL,
    "welcomeMessage" TEXT NOT NULL,
    "showAllowances" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerPortal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectionRequirement" (
    "id" TEXT NOT NULL,
    "portalId" TEXT NOT NULL,
    "categoryId" TEXT,
    "lineItemId" TEXT,
    "categoryName" TEXT NOT NULL,
    "area" TEXT,
    "title" TEXT NOT NULL,
    "instructions" TEXT,
    "customerGuidance" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "quantity" DECIMAL(12,2),
    "unit" TEXT,
    "allowanceCents" INTEGER,
    "preferredOptions" TEXT[],
    "enabledFields" TEXT[],
    "dueDate" TIMESTAMP(3),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SelectionRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialSelection" (
    "id" TEXT NOT NULL,
    "requirementId" TEXT NOT NULL,
    "status" "SelectionStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "productName" TEXT,
    "manufacturer" TEXT,
    "modelSku" TEXT,
    "color" TEXT,
    "finish" TEXT,
    "dimensions" TEXT,
    "productUrls" TEXT[],
    "notes" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "submittedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaterialSelection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectionRevision" (
    "id" TEXT NOT NULL,
    "selectionId" TEXT NOT NULL,
    "revisionNumber" INTEGER NOT NULL,
    "snapshot" JSONB NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SelectionRevision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "selectionId" TEXT NOT NULL,
    "revisionId" TEXT,
    "blobPathname" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "originalName" TEXT NOT NULL,
    "uploadedBy" "UploadedBy" NOT NULL DEFAULT 'CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectionReview" (
    "id" TEXT NOT NULL,
    "selectionId" TEXT NOT NULL,
    "revisionId" TEXT,
    "decision" "ReviewDecision" NOT NULL,
    "internalNote" TEXT,
    "customerFeedback" TEXT,
    "reviewerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SelectionReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "actorType" "ActorType" NOT NULL,
    "actorId" TEXT,
    "actorName" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "portalId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminSession_tokenHash_key" ON "AdminSession"("tokenHash");

-- CreateIndex
CREATE INDEX "AdminSession_userId_idx" ON "AdminSession"("userId");

-- CreateIndex
CREATE INDEX "AdminSession_expiresAt_idx" ON "AdminSession"("expiresAt");

-- CreateIndex
CREATE INDEX "LoginAttempt_key_createdAt_idx" ON "LoginAttempt"("key", "createdAt");

-- CreateIndex
CREATE INDEX "JobberSyncRun_startedAt_idx" ON "JobberSyncRun"("startedAt");

-- CreateIndex
CREATE UNIQUE INDEX "JobberClient_jobberId_key" ON "JobberClient"("jobberId");

-- CreateIndex
CREATE INDEX "JobberClient_name_idx" ON "JobberClient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JobberQuote_jobberId_key" ON "JobberQuote"("jobberId");

-- CreateIndex
CREATE INDEX "JobberQuote_clientId_idx" ON "JobberQuote"("clientId");

-- CreateIndex
CREATE INDEX "JobberQuote_status_idx" ON "JobberQuote"("status");

-- CreateIndex
CREATE UNIQUE INDEX "JobberQuoteLineItem_jobberId_key" ON "JobberQuoteLineItem"("jobberId");

-- CreateIndex
CREATE INDEX "JobberQuoteLineItem_quoteId_idx" ON "JobberQuoteLineItem"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "SelectionCategory_slug_key" ON "SelectionCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerPortal_tokenHash_key" ON "CustomerPortal"("tokenHash");

-- CreateIndex
CREATE INDEX "CustomerPortal_quoteId_idx" ON "CustomerPortal"("quoteId");

-- CreateIndex
CREATE INDEX "CustomerPortal_status_idx" ON "CustomerPortal"("status");

-- CreateIndex
CREATE INDEX "SelectionRequirement_portalId_sortOrder_idx" ON "SelectionRequirement"("portalId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialSelection_requirementId_key" ON "MaterialSelection"("requirementId");

-- CreateIndex
CREATE INDEX "MaterialSelection_status_idx" ON "MaterialSelection"("status");

-- CreateIndex
CREATE UNIQUE INDEX "SelectionRevision_selectionId_revisionNumber_key" ON "SelectionRevision"("selectionId", "revisionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_blobPathname_key" ON "Attachment"("blobPathname");

-- CreateIndex
CREATE INDEX "Attachment_selectionId_idx" ON "Attachment"("selectionId");

-- CreateIndex
CREATE INDEX "SelectionReview_selectionId_createdAt_idx" ON "SelectionReview"("selectionId", "createdAt");

-- CreateIndex
CREATE INDEX "ActivityLog_createdAt_idx" ON "ActivityLog"("createdAt");

-- CreateIndex
CREATE INDEX "ActivityLog_portalId_createdAt_idx" ON "ActivityLog"("portalId", "createdAt");

-- CreateIndex
CREATE INDEX "ActivityLog_entityType_entityId_idx" ON "ActivityLog"("entityType", "entityId");

-- AddForeignKey
ALTER TABLE "AdminSession" ADD CONSTRAINT "AdminSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AdminUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobberSyncRun" ADD CONSTRAINT "JobberSyncRun_startedById_fkey" FOREIGN KEY ("startedById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobberQuote" ADD CONSTRAINT "JobberQuote_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "JobberClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobberQuoteLineItem" ADD CONSTRAINT "JobberQuoteLineItem_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "JobberQuote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPortal" ADD CONSTRAINT "CustomerPortal_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "JobberQuote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPortal" ADD CONSTRAINT "CustomerPortal_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectionRequirement" ADD CONSTRAINT "SelectionRequirement_portalId_fkey" FOREIGN KEY ("portalId") REFERENCES "CustomerPortal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectionRequirement" ADD CONSTRAINT "SelectionRequirement_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SelectionCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectionRequirement" ADD CONSTRAINT "SelectionRequirement_lineItemId_fkey" FOREIGN KEY ("lineItemId") REFERENCES "JobberQuoteLineItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialSelection" ADD CONSTRAINT "MaterialSelection_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "SelectionRequirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectionRevision" ADD CONSTRAINT "SelectionRevision_selectionId_fkey" FOREIGN KEY ("selectionId") REFERENCES "MaterialSelection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_selectionId_fkey" FOREIGN KEY ("selectionId") REFERENCES "MaterialSelection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_revisionId_fkey" FOREIGN KEY ("revisionId") REFERENCES "SelectionRevision"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectionReview" ADD CONSTRAINT "SelectionReview_selectionId_fkey" FOREIGN KEY ("selectionId") REFERENCES "MaterialSelection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectionReview" ADD CONSTRAINT "SelectionReview_revisionId_fkey" FOREIGN KEY ("revisionId") REFERENCES "SelectionRevision"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectionReview" ADD CONSTRAINT "SelectionReview_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_portalId_fkey" FOREIGN KEY ("portalId") REFERENCES "CustomerPortal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
