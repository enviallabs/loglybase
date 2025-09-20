/*
  Warnings:

  - Made the column `slug` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "project" ALTER COLUMN "slug" SET NOT NULL;
