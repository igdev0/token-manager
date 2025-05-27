"use client";
import {useEffect, useMemo, useRef, useState} from 'react';
import {Contact} from '@/lib/generated/prisma';
import {fetchContacts} from '@/app/dashboard/contacts/actions';
import Spinner from '@/components/spinner';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {PlaneTakeoff} from 'lucide-react';
import {useWalletStore} from '@/store/wallet';
import ContactsList, {ContactsListRef} from '@/components/contacts-list';
import {getContactTags} from '@/app/dashboard/airdrop/actions';

export default function Page() {
  const [data, setData] = useState<Contact[] | null>(null);
  const [tags, setTags] = useState<string[] | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const searchParams = useMemo(() => {
    if(typeof window === "undefined") return new URLSearchParams()
    return new URLSearchParams(window?.location.href);
  }, []);
  const [owner] = useWalletStore().accounts;
  const contactListRef = useRef<ContactsListRef>(null);

  useEffect(() => {
    if (owner) {
      const tags = contactListRef.current?.getTags() ?? [];
      fetchContacts(owner, searchParams.get("search") ?? "", tags ?? []).then(setData).catch(console.error);
      getContactTags(owner).then(setTags).catch(console.error);
    }

  }, [owner, contactListRef, searchParams]);

  const onCheckedChange = (id: string) => {
    return (checked: boolean) => {
      setSelected(checked ? [...selected, id] : selected.filter(v => v !== id));
    };
  };

  const onTagsChange = (tags: string[]) => {
    fetchContacts(owner, searchParams.get("search") ?? "", tags ?? []).then(setData).catch(console.error);
  };

  const onSearch = (value: string) => {
    const tags = contactListRef.current?.getTags() ?? [];
    fetchContacts(owner, value, tags).then(setData);
  };

  if (!data || !tags) {
    return (
        <Spinner/>
    );
  }

  if (data.length === 0 && searchParams.get("search") === null) {
    return (
        <div className="w-full text-center">
          <h1 className="text-2xl font-extrabold"> No contacts found.</h1>
          <p className="mb-4">Create a contact and will be displayed here</p>
          <Button asChild={true}><Link href="/dashboard/contacts/create">Create Contact</Link></Button>
        </div>
    );
  }

  return (
      <div>
        <h1 className="text-2xl font-extrabold">Contacts</h1>
        <div className="flex w-full justify-end mb-4 gap-2">
          <Button disabled={selected.length === 0}
                  variant="outline"><PlaneTakeoff/> Airdrop {selected.length > 0 ? `to selected (${selected.length})` : ""}
          </Button>
          <Button className="left-auto" asChild={true}>
            <Link href="/dashboard/contacts/create">
              Add new
            </Link>
          </Button>
        </div>
        <ContactsList ref={contactListRef}
                      data={data}
                      tags={tags}
                      onTagsChange={onTagsChange}
                      onCheckedChange={onCheckedChange}
                      baseURL="/dashboard/contacts"
                      onSearchInputChange={onSearch}
        />
      </div>
  );
}