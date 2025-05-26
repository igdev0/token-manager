"use client";
import {useEffect, useRef, useState} from 'react';
import {Contact} from '@/lib/generated/prisma';
import {fetchContacts, findContacts} from '@/app/dashboard/contacts/actions';
import Spinner from '@/components/spinner';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {PlaneTakeoff} from 'lucide-react';
import {useWalletStore} from '@/store/wallet';
import {useRouter, useSearchParams} from 'next/navigation';
import ContactsList from '@/components/contacts-list';

export default function Page() {
  const [data, setData] = useState<Contact[] | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [owner] = useWalletStore().accounts;
  const timer = useRef<any>(null);
  useEffect(() => {
    owner && fetchContacts(owner).then(setData).catch(console.error);
  }, [owner]);

  const onCheckedChange = (id: string) => {
    return (checked: boolean) => {
      setSelected(checked ? [...selected, id] : selected.filter(v => v !== id));
    };
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer.current);
    const target = e.currentTarget;
    router.push("/dashboard/contacts?search=" + (target.value));
    timer.current = setTimeout(() => {
      findContacts(target.value).then(setData);
      clearTimeout(timer.current);
    }, 500);
  };


  if (!data) {
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
        <ContactsList data={data} onCheckedChange={onCheckedChange} search={searchParams.get("search")}
                      onSearchInputChange={handleSearch}/>

      </div>
  );
}