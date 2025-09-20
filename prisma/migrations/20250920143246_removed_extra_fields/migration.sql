/*
  Warnings:

  - You are about to drop the column `activePlan` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lifetimePlan` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "activePlan",
DROP COLUMN "customerId",
DROP COLUMN "lifetimePlan",
DROP COLUMN "subscriptionId",
ALTER COLUMN "noBranding" SET DEFAULT true;
