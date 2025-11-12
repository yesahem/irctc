/*
  Warnings:

  - A unique constraint covering the columns `[trainNumber]` on the table `Train` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trainNumber` to the `Train` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable - Add trainNumber column with a temporary default
ALTER TABLE "Train" ADD COLUMN "trainNumber" TEXT;

-- Update existing trains with unique train numbers using a subquery
UPDATE "Train" t
SET "trainNumber" = LPAD(CAST(sub.rn AS TEXT), 5, '0')
FROM (
  SELECT "trainId", ROW_NUMBER() OVER (ORDER BY "trainId") as rn
  FROM "Train"
) sub
WHERE t."trainId" = sub."trainId";

-- Make the column NOT NULL after populating it
ALTER TABLE "Train" ALTER COLUMN "trainNumber" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Train_trainNumber_key" ON "Train"("trainNumber");
