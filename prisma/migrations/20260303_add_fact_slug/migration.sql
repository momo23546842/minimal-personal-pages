-- Backfill: give every existing Fact row a unique slug before adding the constraint.
-- We use 'fact-' || id which is guaranteed unique since id is the PK.
ALTER TABLE "Fact" ADD COLUMN "slug" TEXT;
UPDATE "Fact" SET "slug" = 'fact-' || "id" WHERE "slug" IS NULL;
ALTER TABLE "Fact" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Fact_slug_key" ON "Fact"("slug");
