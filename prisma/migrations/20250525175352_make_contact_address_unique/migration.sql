/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contact_address_key" ON "Contact"("address");
