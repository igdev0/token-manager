"use server";
import {PrismaClient} from '@/lib/generated/prisma';

const prisma = new PrismaClient();

export async function getTokens(offset = 1, perPage = 10) {
  return prisma.token.findMany({
    take: perPage,
    skip: (offset - 1) * perPage,
  });
}


export async function getTotalTokens() {
  return prisma.token.count();
}