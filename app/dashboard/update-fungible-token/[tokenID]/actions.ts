import {PrismaClient} from '@/lib/generated/prisma';

const client = new PrismaClient();
export function getToken(id: string) {
  return client.token.findUnique({
    where: {
      id
    }
  })
}