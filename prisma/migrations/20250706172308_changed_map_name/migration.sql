/*
  Warnings:

  - You are about to drop the `api_key` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "api_key" DROP CONSTRAINT "api_key_userId_fkey";

-- DropTable
DROP TABLE "api_key";

-- CreateTable
CREATE TABLE "apikey" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "start" TEXT,
    "prefix" TEXT,
    "key" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "refillInterval" INTEGER,
    "refillAmount" INTEGER,
    "lastRefillAt" TIMESTAMP(3),
    "enabled" BOOLEAN NOT NULL,
    "rateLimitEnabled" BOOLEAN NOT NULL,
    "rateLimitTimeWindow" INTEGER,
    "rateLimitMax" INTEGER,
    "requestCount" INTEGER NOT NULL,
    "remaining" INTEGER,
    "lastRequest" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "permissions" TEXT,
    "metadata" JSONB,

    CONSTRAINT "apikey_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "apikey" ADD CONSTRAINT "apikey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
