/*
  Warnings:

  - The primary key for the `ApiToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ApiToken` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ApiToken" DROP CONSTRAINT "ApiToken_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ApiToken_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "ApiToken_userId_idx" ON "ApiToken"("userId");
