-- CreateEnum
CREATE TYPE "Initiator" AS ENUM ('USER', 'PARTNER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "firstDayOfWeek" INTEGER NOT NULL DEFAULT 1,
    "partnerId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood" (
    "userId" TEXT NOT NULL,
    "validUntil" TIMESTAMP(3),
    "inMoodFor" TEXT,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SexAct" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "duration" TEXT,
    "location" TEXT,
    "initiator" "Initiator" NOT NULL,
    "foreplayOnUser" TEXT,
    "foreplayOnPartner" TEXT,
    "position" TEXT NOT NULL,
    "userFinished" BOOLEAN NOT NULL,
    "partnerFinished" BOOLEAN NOT NULL,

    CONSTRAINT "SexAct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayWithoutSex" (
    "dateTime" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "onPeriod" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DayWithoutSex_pkey" PRIMARY KEY ("dateTime","userId")
);

-- CreateTable
CREATE TABLE "PushNotification" (
    "userId" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "keys" JSONB NOT NULL,

    CONSTRAINT "PushNotification_pkey" PRIMARY KEY ("endpoint","userId")
);

-- CreateTable
CREATE TABLE "SexInterest" (
    "id" TEXT NOT NULL,
    "translationKey" TEXT NOT NULL,
    "defaultMessage" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "descriptionTranslationKey" TEXT NOT NULL,
    "descriptionDefaultMessage" TEXT NOT NULL,

    CONSTRAINT "SexInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SexInterestUserIntent" (
    "userId" TEXT NOT NULL,
    "sexInterestId" TEXT NOT NULL,
    "interested" BOOLEAN NOT NULL,
    "noticedByPartner" BOOLEAN NOT NULL DEFAULT false,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SexInterestUserIntent_pkey" PRIMARY KEY ("userId","sexInterestId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "translationKey" TEXT NOT NULL,
    "defaultMessage" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SexInterestToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_partnerId_key" ON "User"("partnerId");

-- CreateIndex
CREATE UNIQUE INDEX "Mood_userId_key" ON "Mood"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE INDEX "SexAct_userId_idx" ON "SexAct"("userId");

-- CreateIndex
CREATE INDEX "DayWithoutSex_userId_idx" ON "DayWithoutSex"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PushNotification_endpoint_key" ON "PushNotification"("endpoint");

-- CreateIndex
CREATE INDEX "PushNotification_userId_idx" ON "PushNotification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SexInterest_translationKey_key" ON "SexInterest"("translationKey");

-- CreateIndex
CREATE INDEX "SexInterestUserIntent_userId_idx" ON "SexInterestUserIntent"("userId");

-- CreateIndex
CREATE INDEX "SexInterestUserIntent_sexInterestId_idx" ON "SexInterestUserIntent"("sexInterestId");

-- CreateIndex
CREATE UNIQUE INDEX "SexInterestUserIntent_userId_sexInterestId_key" ON "SexInterestUserIntent"("userId", "sexInterestId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_translationKey_key" ON "Tag"("translationKey");

-- CreateIndex
CREATE UNIQUE INDEX "_SexInterestToTag_AB_unique" ON "_SexInterestToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_SexInterestToTag_B_index" ON "_SexInterestToTag"("B");
