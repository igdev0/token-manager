"use server";

import {PrismaClient} from '@/lib/generated/prisma';

const client = new PrismaClient();

export async function fetchContacts(owner: string) {
  return client.contact.findMany({where: {owner}});
}

export async function createContact(owner: string, alias: string, tags: string[], address: string) {
  return client.contact.create({data: {owner, alias, tags, address}});
}

export async function findContacts(alias: string) {
  return client.contact.findMany({where: {alias: {contains: alias}}});
}