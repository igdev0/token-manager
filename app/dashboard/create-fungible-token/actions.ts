"use server";
import {$Enums, PrismaClient} from '@/lib/generated/prisma';
import TokenKind = $Enums.TokenKind;

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export async function storeToken(name: string, symbol: string, tokenAddress: string, type: TokenKind = "Fungible", network_name: string, chain_id: string, owner: string) {
  return prisma.token.create({
    data: {
      name: name,
      symbol: symbol,
      address: tokenAddress.toLowerCase(),
      type,
      network_name,
      chain_id,
      owner: owner.toLowerCase()
    }
  });
}