/*
  Warnings:

  - The primary key for the `Tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookinStatus` on the `Tickets` table. All the data in the column will be lost.
  - The primary key for the `Train` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `bookingStatus` to the `Tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Tickets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `ticketId` on the `Tickets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `trainId` on the `Tickets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `trainId` on the `Train` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_trainId_fkey";

-- DropForeignKey
ALTER TABLE "Train" DROP CONSTRAINT "Train_userId_fkey";

-- AlterTable
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_pkey",
DROP COLUMN "bookinStatus",
ADD COLUMN     "bookingStatus" "Status" NOT NULL,
ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "ticketId",
ADD COLUMN     "ticketId" UUID NOT NULL,
DROP COLUMN "trainId",
ADD COLUMN     "trainId" UUID NOT NULL,
ADD CONSTRAINT "Tickets_pkey" PRIMARY KEY ("ticketId");

-- AlterTable
ALTER TABLE "Train" DROP CONSTRAINT "Train_pkey",
DROP COLUMN "trainId",
ADD COLUMN     "trainId" UUID NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Train_pkey" PRIMARY KEY ("trainId");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("trainId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
