"use server";

import {PrismaClient} from '@/lib/generated/prisma';

const client = new PrismaClient();

export async function fetchContacts(owner: string, search?: string, tags?: string[]) {
  return client.contact.findMany({
    where: {
      owner,
      alias: {
        contains: search,
      },
      tags: {
        hasEvery: tags
      }
    }
  });
}

export async function findContactsByTags(tags: string, owner: string) {
  return client.contact.findMany({where: {owner, tags: {has: tags}}});
}

export async function createContact(owner: string, alias: string, tags: string[], address: string) {
  return client.contact.create({data: {owner, alias, tags, address}});
}

export async function findContacts(alias: string, owner: string) {
  return client.contact.findMany({where: {owner, alias: {contains: alias}}});
}