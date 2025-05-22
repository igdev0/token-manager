import {PrismaClient} from '@/lib/generated/prisma';

const prisma = new PrismaClient();

export async function getTokens() {
  return prisma.token.findMany();
}
