/*
  Warnings:

  - You are about to drop the `ApiToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApiToken" DROP CONSTRAINT "ApiToken_userId_fkey";

-- DropTable
DROP TABLE "ApiToken";

-- CreateTable
CREATE TABLE "api_token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "api_token_userId_idx" ON "api_token"("userId");

-- AddForeignKey
ALTER TABLE "api_token" ADD CONSTRAINT "api_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
