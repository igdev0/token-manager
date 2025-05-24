"use server";

import {PrismaClient} from '@/lib/generated/prisma';

const client = new PrismaClient();

export async function fetchContacts() {
  return client.contact.findMany();
}