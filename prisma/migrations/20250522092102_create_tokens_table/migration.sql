-- CreateEnum
CREATE TYPE "TokenKind" AS ENUM ('Fungible', 'NonFungible');

-- CreateTable
CREATE TABLE "Tokens" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "type" "TokenKind" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("id")
);
