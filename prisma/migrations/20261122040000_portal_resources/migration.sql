-- AlterTable
ALTER TABLE "CustomerPortal" ADD COLUMN "resourcesCustomized" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "CustomerPortal" ADD COLUMN "resourceSlugs" TEXT[] DEFAULT ARRAY[]::TEXT[];
