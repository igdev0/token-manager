"use client";
import {useWalletStore} from '@/store/wallet';
import {Token} from '@/app/dashboard/page';
import {useEffect, useState} from 'react';
import {Contact} from '@/lib/generated/prisma';
import {getContacts, getContactTags, getTokens} from '@/app/dashboard/airdrop/actions';
import Spinner from '@/components/spinner';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import {clsx} from 'clsx';
import ContactsList from '@/components/contacts-list';
import {useSearchParams} from 'next/navigation';

export default function AirdropPage() {
  const searchParams = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [tags, setTags] = useState<string[] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Token[] | null>(null);
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [owner] = useWalletStore().accounts;

  const onTagClick = (tag: string) => () => {

    setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter(v => v !== tag) : [...selectedTags, tag]);
  };

  const onCheckedChange = (id: string) => {
    return (checked: boolean) => {
      setSelectedTags(checked ? [...selectedTags, id] : selectedTags.filter(v => v !== id));
    };
  }

  useEffect(() => {
    if (owner) {
      getTokens(owner).then(setTokens).catch(console.error);
      getContactTags(owner).then(setTags).catch(console.error);
      getContacts(owner).then(setContacts).catch(console.error);
      setLoading(false);
    }
  }, [owner]);

  if (!tokens || !contacts || !tags) return (
      <Spinner/>
  );

  const thCls = "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";

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
        <div className="flex flex-wrap gap-2 mt-4 mb-2">
          <h4 className="text-md font-bold">2. Select contacts:</h4>
          {tags?.map(item => (
              <div key={item} className={clsx('px-2 py-1 rounded-sm tex-xs cursor-pointer', selectedTags.includes(item) ? "bg-gray-400" : "bg-gray-200")} onClick={onTagClick(item)}>
                {item}
              </div>
          ))}
        </div>
        <ContactsList data={contacts} onCheckedChange={onCheckedChange} search={searchParams.get("search")}/>
        {/*<table className="w-full">*/}
        {/*  <thead className="bg-gray-200">*/}
        {/*  <tr>*/}
        {/*    <th className={thCls}>Select</th>*/}
        {/*    <th className={thCls}>Alias</th>*/}
        {/*    <th className={thCls}>Address</th>*/}
        {/*    <th className={thCls}>Tags</th>*/}
        {/*  </tr>*/}
        {/*  </thead>*/}
        {/*  <tbody>*/}
        {/*  {*/}
        {/*    contacts.map(({id, alias, address, tags}) => (*/}
        {/*        <tr key={id} className="nth-[even]:bg-gray-100">*/}
        {/*          <td className="px-4 flex items-center"><Checkbox name={id} onCheckedChange={onCheckedChange(id)}/>*/}
        {/*          </td>*/}
        {/*          <td className="px-4 py-2">{alias}</td>*/}
        {/*          <td className="px-4 py-2">{address}</td>*/}
        {/*        </tr>))*/}
        {/*  }*/}
        {/*  </tbody>*/}
        {/*</table>*/}
      </>
  );
}