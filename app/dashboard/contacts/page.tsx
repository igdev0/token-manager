"use client";
import {useEffect, useState} from 'react';
import {Contact} from '@/lib/generated/prisma';
import {fetchContacts} from '@/app/dashboard/contacts/actions';
import Spinner from '@/components/spinner';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  const [data, setData] = useState<Contact[] | null>(null);

  useEffect(() => {
    fetchContacts().then(setData).catch(console.error);
  }, []);

  if (!data) {
    return (
        <Spinner/>
    );
  }

  if(data.length === 0) {
    return (
        <div>
          <h1 className="text-2xl font-extrabold"> No contacts found.</h1>
          <p className="mb-4">Create a contact and will be displayed here</p>
          <Button asChild={true}><Link href="/contact/create">Create Contact</Link></Button>
        </div>
    )
  }

  return (
      <div>
        <h1 className="text-2xl font-extrabold">Contacts</h1>
        <table>

        </table>
      </div>
  );
}