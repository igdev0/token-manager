"use server";
import {prisma} from '@/lib/prisma';

export async function getTokens(owner: string) {
  return prisma.token.findMany({where: {owner}});
}

export async function getContactsByID(id: string, owner: string) {
  return prisma.contact.findMany({where: {id, owner}});
}

export async function getContactAddressesByTags(tags: string[], owner: string) {
  return prisma.contact.findMany({where: {owner, tags: {hasSome: tags}}}).then(res => Array.from(new Set(res.map(r => r.address))));
}

export async function getContacts(owner: string) {
  return prisma.contact.findMany({where: {owner}});
}

export async function getContactTags(owner: string) {
  return prisma.contact.findMany({where: {owner}}).then(res => Array.from(new Set(res.flatMap(r => r.tags))));
}