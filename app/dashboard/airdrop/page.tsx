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
import {User2} from 'lucide-react';
import {BrowserProvider, ethers} from 'ethers';
import ERC20Token from '@/artifacts/contracts/ERC20Token.sol/ERC20Token.json';
import {toast} from 'sonner';

export default function AirdropPage() {
  const [selectedContacts, setSelectedContacts] = useState<{alias: string, address: string}[]>([]);
  const searchParams = useSearchParams();
  const [tags, setTags] = useState<string[] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Token[] | null>(null);
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const contactListRef = useRef(null);
  const wallet = useWalletStore();
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

  const onSubmit = async () => {
    const values = form.getValues();
    if(!wallet.currentProvider?.provider || !tokens) {return}
    const _token = !token ? tokens[0].address : token;
    const browserProvider = new BrowserProvider(wallet.currentProvider?.provider);
    const signer = await browserProvider.getSigner(owner);
    const contract = new ethers.Contract(_token, ERC20Token.abi, signer);
    const airdrop = Object.keys(values).map(address => ({
      addr: address,
      amount: values[address]
    }))
    try {
      const tx = await contract.airdrop(airdrop, 0);
      await tx.wait();
      toast("Tokens minted!", {position: "top-right", description: "Tokens airdroped successfully!"})
    } catch (err) {
      console.error(err);
      toast("Failed to airdrop tokens", {position: "top-right", description: (err as Error).message})
    }
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
        <h4>Selected ({selectedContacts.length})</h4>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {
            selectedContacts.map((item) => (
                <fieldset key={item.address} className="mb-2">
                  <label className="font-bold mb-1 inline-flex gap-2 items-center" htmlFor={item.address}><User2/>{item.alias}</label>
                  <Input className="max-w-[500]" type="number" placeholder="Amount" id={item.address} {...form.register(item.address, {required: true})}/>
                </fieldset>
            ))
          }
          <Button disabled={!selectedContacts.length} type="submit">Mint</Button>
        </form>
      </>
  );
}