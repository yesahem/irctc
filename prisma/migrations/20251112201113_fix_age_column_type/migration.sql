/*
  Warnings:

  - Changed the type of `class` on the `Tickets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `age` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CoachClass" AS ENUM ('THIRD_AC', 'SECOND_AC', 'FIRST_AC', 'SLEEPER', 'CHAIR_CAR', 'GENERAL');

-- Step 1: Update Tickets table to use new CoachClass enum
-- First add a temporary column
ALTER TABLE "Tickets" ADD COLUMN "class_new" "CoachClass";

-- Copy data from old column to new column (casting enum values)
UPDATE "Tickets" SET "class_new" = "class"::"text"::"CoachClass";

-- Drop the old column
ALTER TABLE "Tickets" DROP COLUMN "class";

-- Rename the new column to the original name
ALTER TABLE "Tickets" RENAME COLUMN "class_new" TO "class";

-- Make it NOT NULL
ALTER TABLE "Tickets" ALTER COLUMN "class" SET NOT NULL;

-- Step 2: Convert age from TEXT to INTEGER
-- First alter the column type using CAST
ALTER TABLE "User" ALTER COLUMN "age" TYPE INTEGER USING "age"::integer;

-- DropEnum
DROP TYPE "Class";

