/*
  Warnings:

  - Added the required column `content` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `layout` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "content" JSONB NOT NULL,
ADD COLUMN     "layout" JSONB NOT NULL;
