"use server";

import {PrismaClient} from '@/lib/generated/prisma';

const client = new PrismaClient();

export async function fetchContacts(owner:string) {
  return client.contact.findMany({where: {owner}});
}