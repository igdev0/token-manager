"use server";
import {$Enums} from '@/lib/generated/prisma';
import {prisma} from '@/lib/prisma';
import TokenKind = $Enums.TokenKind;

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