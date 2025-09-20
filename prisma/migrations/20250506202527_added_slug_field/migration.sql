/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "project_slug_key" ON "project"("slug");
