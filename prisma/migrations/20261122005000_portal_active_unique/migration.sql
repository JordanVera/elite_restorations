-- At most one portal per quote that is not revoked. Prisma cannot express a
-- partial unique index, so it lives here.
CREATE UNIQUE INDEX "CustomerPortal_quoteId_active_key"
  ON "CustomerPortal" ("quoteId")
  WHERE "status" <> 'REVOKED';

-- Revision numbers and versions never go negative.
ALTER TABLE "MaterialSelection" ADD CONSTRAINT "MaterialSelection_version_check" CHECK ("version" >= 0);
ALTER TABLE "SelectionRevision" ADD CONSTRAINT "SelectionRevision_revisionNumber_check" CHECK ("revisionNumber" >= 1);
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_size_check" CHECK ("size" > 0);
