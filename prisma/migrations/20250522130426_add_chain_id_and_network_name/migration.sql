/*
  Warnings:

  - Added the required column `chain_id` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network_name` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "chain_id" TEXT NOT NULL,
ADD COLUMN     "network_name" TEXT NOT NULL;
