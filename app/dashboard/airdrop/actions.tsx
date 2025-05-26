"use server";
import {PrismaClient} from '@/lib/generated/prisma';

const client = new PrismaClient();

export async function getTokens(owner: string) {
  return client.token.findMany({where: {owner}});
}

export async function getContactsByID(id: string, owner: string) {
  return client.contact.findMany({where: {id, owner}});
}

export async function getContactAddressesByTags(tags: string[], owner: string) {
  return client.contact.findMany({where: {owner, tags: {hasSome: tags}}}).then(res => Array.from(new Set(res.map(r => r.address))));
}

export async function getContacts(owner: string) {
  return client.contact.findMany({where: {owner}});
}

export async function getContactTags(owner: string) {
  return client.contact.findMany({where: {owner}}).then(res => Array.from(new Set(res.flatMap(r => r.tags))));
}