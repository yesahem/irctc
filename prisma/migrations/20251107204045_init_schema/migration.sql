-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CONFIRM', 'CANCELLED', 'RAC', 'WAITLIST');

-- CreateEnum
CREATE TYPE "Class" AS ENUM ('THIRD_AC', 'SECOND_AC', 'FIRST_AC', 'SLEEPER', 'CHAIR_CAR', 'GENERAL');

-- CreateTable
CREATE TABLE "User" (
    "userId" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Train" (
    "trainId" SERIAL NOT NULL,
    "trainName" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "arrival" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Train_pkey" PRIMARY KEY ("trainId")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "ticketId" SERIAL NOT NULL,
    "passengerName" TEXT NOT NULL,
    "seatNumber" TEXT NOT NULL,
    "trainId" INTEGER NOT NULL,
    "class" "Class" NOT NULL,
    "dateOfJourney" TIMESTAMP(3) NOT NULL,
    "dateOfBooking" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bookinStatus" "Status" NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("ticketId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("trainId") ON DELETE RESTRICT ON UPDATE CASCADE;
