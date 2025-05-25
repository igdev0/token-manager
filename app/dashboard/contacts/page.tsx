"use client";
import {useEffect, useState} from 'react';
import {Contact} from '@/lib/generated/prisma';
import {fetchContacts} from '@/app/dashboard/contacts/actions';
import Spinner from '@/components/spinner';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {useWalletStore} from '@/store/wallet';

export default function Page() {
  const [data, setData] = useState<Contact[] | null>(null);
  const [owner] = useWalletStore().accounts;
  useEffect(() => {
    owner && fetchContacts(owner).then(setData).catch(console.error);
  }, [owner]);

  if (!data) {
    return (
        <Spinner/>
    );
  }

  if (data.length === 0) {
    return (
        <div className="w-full text-center">
          <h1 className="text-2xl font-extrabold"> No contacts found.</h1>
          <p className="mb-4">Create a contact and will be displayed here</p>
          <Button asChild={true}><Link href="/dashboard/contacts/create">Create Contact</Link></Button>
        </div>
    );
  }

  const thCls = "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";

  return (
      <div className="w-full max-w-[1600] mx-auto px-2">
        <h1 className="text-2xl font-extrabold">Contacts</h1>
        <div className="flex w-full justify-end mb-4">
          <Button className="left-auto">Add new</Button>
        </div>
        <table className="w-full">
          <thead className="bg-gray-200">
          <tr>
            <th className={thCls}>Alias</th>
            <th className={thCls}>Address</th>
            <th className={thCls}>Tags</th>
          </tr>
          </thead>
          <tbody>
          {
            data.map(({id, alias, address, tags}) => (
                <tr key={id} className="nth-[even]:bg-gray-100">
                  <td className="px-4 py-2">{alias}</td>
                  <td className="px-4 py-2">{address}</td>
                  <td className="px-4 py-2 flex gap-2">{tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-sm bg-black text-white rounded-sm">{tag}</span>))}</td>
                </tr>))
          }
          </tbody>
        </table>
      </div>
  );
}