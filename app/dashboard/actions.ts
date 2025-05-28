"use server";


import {prisma} from '@/lib/prisma';

export async function getTokens(offset = 1, perPage = 10) {
  return prisma.token.findMany({
    take: perPage,
    skip: (offset - 1) * perPage,
  });
}


export async function getTotalTokens() {
  return prisma.token.count();
}