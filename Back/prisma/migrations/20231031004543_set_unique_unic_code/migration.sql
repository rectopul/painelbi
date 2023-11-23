/*
  Warnings:

  - A unique constraint covering the columns `[unic_code]` on the table `AdAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AdAccount_unic_code_key" ON "AdAccount"("unic_code");
