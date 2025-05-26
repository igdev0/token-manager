"use client";
import {useWalletStore} from '@/store/wallet';
import {Token} from '@/app/dashboard/page';
import {useEffect, useRef, useState} from 'react';
import {Contact} from '@/lib/generated/prisma';
import {getContacts, getContactTags, getTokens} from '@/app/dashboard/airdrop/actions';
import Spinner from '@/components/spinner';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import ContactsList from '@/components/contacts-list';
import {fetchContacts, findContacts} from '@/app/dashboard/contacts/actions';
import {Input} from '@/components/ui/input';
import {useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import {useSearchParams} from 'next/navigation';

export default function AirdropPage() {
  const [selectedContacts, setSelectedContacts] = useState<{alias: string, address: string}[]>([]);
  const searchParams = useSearchParams();
  const [tags, setTags] = useState<string[] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Token[] | null>(null);
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const contactListRef = useRef(null);
  const [owner] = useWalletStore().accounts;
  const form = useForm();


  const onCheckedChange = (alias: string, address: string) => {
    return (checked: boolean) => {
      setSelectedContacts(checked ? [...selectedContacts, {alias, address}] : selectedContacts.filter(v => v.address !== address));
    };
  };

  const onSearchInputChange = (value: string) => {
    findContacts(value, owner).then(setContacts).catch(console.error);
  };

  const handleTagsChange = (tags: string[]) => {
    fetchContacts(owner, searchParams.get("search") ?? "", tags ?? []).then(setContacts).catch(console.error);
  };

  const onSubmit = () => {
    const values = form.getValues();
    console.log(values)
  }

  useEffect(() => {
    if (owner) {
      getTokens(owner).then(setTokens).catch(console.error);
      getContactTags(owner).then(setTags).catch(console.error);
      getContacts(owner).then(setContacts).catch(console.error);
    }
  }, [owner]);

  if (!tokens || !contacts || !tags) return (
      <Spinner/>
  );

  return (
      <>
        <h1 className="text-2xl font-bold mb-4">Airdrop Tokens</h1>
        <h4 className="text-md font-bold">1. Select a token:</h4>
        <RadioGroup defaultValue={tokens[0].address} onValueChange={setToken}>
          {
            tokens?.map(item => (
                <div key={item.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={item.address} id={item.id}/>
                  <Label htmlFor={item.id}>{item.name} ({item.symbol})</Label>
                </div>
            ))
          }
        </RadioGroup>
        <ContactsList baseURL="/dashboard/airdrop" ref={contactListRef} data={contacts} tags={tags} onSearchInputChange={onSearchInputChange}
                      onTagsChange={handleTagsChange} onCheckedChange={onCheckedChange}/>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {
            selectedContacts.map((item) => (
                <fieldset key={item.address}>
                  <legend>Contact: {item.alias}</legend>
                  <Input type="number" placeholder="Amount" {...form.register(item.address)}/>
                </fieldset>
            ))
          }
          <Button type="submit">Mint</Button>
        </form>
      </>
  );
}