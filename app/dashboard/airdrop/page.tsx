"use client";
import {useWalletStore} from '@/store/wallet';
import {Token} from '@/app/dashboard/page';
import {useEffect, useRef, useState} from 'react';
import {Contact} from '@/lib/generated/prisma';
import {getContactAddressesByTags, getContacts, getContactTags, getTokens} from '@/app/dashboard/airdrop/actions';
import Spinner from '@/components/spinner';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import ContactsList from '@/components/contacts-list';
import {findContacts} from '@/app/dashboard/contacts/actions';

export default function AirdropPage() {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [tags, setTags] = useState<string[] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Token[] | null>(null);
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const contactListRef = useRef(null);
  const [owner] = useWalletStore().accounts;


  const onCheckedChange = (id: string) => {
    return (checked: boolean) => {
      setSelectedContacts(checked ? [...selectedContacts, id] : selectedContacts.filter(v => v !== id));
    };
  };

  const onSearchInputChange = (value: string) => {
    findContacts(value, owner).then(setContacts).catch(console.error);
  };

  const handleTagsChange = (tags: string[]) => {
    getContactAddressesByTags(tags, owner).then(setSelectedContacts).catch(console.error);
  };

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
        <ContactsList ref={contactListRef} data={contacts} tags={tags} onSearchInputChange={onSearchInputChange}
                      onTagsChange={handleTagsChange} onCheckedChange={onCheckedChange}/>
      </>
  );
}