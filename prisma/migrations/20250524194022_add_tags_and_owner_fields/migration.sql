/*
  Warnings:

  - Added the required column `owner` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "owner" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[];
