/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `api_token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "api_token_token_key" ON "api_token"("token");
