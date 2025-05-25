"use client";
import {useParams} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import {getToken} from '@/app/dashboard/update-fungible-token/[tokenID]/actions';
import {useWalletStore} from '@/store/wallet';
import ERC20Token from '@/artifacts/contracts/ERC20Token.sol/ERC20Token.json';
import {BrowserProvider, Contract, ethers} from 'ethers';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {yupResolver} from '@hookform/resolvers/yup';
import {toast} from 'sonner';
import Spinner from '@/components/spinner';

const schema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  symbol: yup.string().required(),
  totalSupply: yup.number().positive().required(),
  decimals: yup.number().positive().required(),
})
    .required();

interface Inputs {
  name: string;
  address: string;
  symbol: string;
  totalSupply: number;
  decimals: number;
}

export default function UpdateFungibleToken() {
  const params = useParams<{ tokenID: string }>();
  const wallet = useWalletStore();
  const [loading, setLoading] = useState(true);
  const contract = useRef<Contract>(null);
  const [initialSupply, setInitialSupply] = useState(0);
  const form = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getToken(params.tokenID).then(v => {
      if (v) {
        form.setValue("name", v.name);
        form.setValue("symbol", v.symbol);
        form.setValue("address", v.address);
      }
    }).catch(console.error).finally(() => setLoading(false));
  }, [params]);

  useEffect(() => {
    if (wallet.currentProvider && form.getValues("address")) {
      const browserProvider = new BrowserProvider(wallet.currentProvider.provider);
      browserProvider.getSigner(wallet.accounts[0]).then(signer => {
        contract.current = new ethers.Contract(form.getValues("address"), ERC20Token.abi, signer);
        contract.current.totalSupply().then(v => {
          form.setValue("totalSupply", Number(v));
          setInitialSupply(Number(v));
        }).catch(console.error);

        contract.current.decimals().then(v => form.setValue("decimals", v)).catch(console.error);
      });
    }
  }, [wallet, form.getValues("address")]);

  const handleUpdate = () => {
    const newSupply = Number(form.getValues("totalSupply"));
    const owner = wallet.accounts[0];
    if (initialSupply > newSupply) {
      contract.current?.burn(owner, BigInt(initialSupply - newSupply)).then(() => toast(`The total supply has been updated to ${newSupply}`, {position: "top-right"})).catch(() => toast(`Failed burning ${initialSupply - newSupply} tokens`, {position: "top-right"}));
    }
    if(initialSupply < newSupply) {
      contract.current?.mint(owner, BigInt(newSupply - initialSupply)).then(() => toast(`The total supply has been updated to ${newSupply}`, {position: "top-right"})).catch(() => toast(`Failed minting ${newSupply - initialSupply} tokens`, {position: "top-right"}));
    }
  };

  if (loading) {
    return (
        <Spinner/>
    );
  }

  return (
      <div>
        <form className="w-full max-w-[1600] mx-auto px-2" onSubmit={form.handleSubmit(handleUpdate)}>
          <fieldset className="mb-2">
            <label htmlFor="name">Token Address:</label>
            <Input placeholder="Address: 0x0000" {...form.register('address')} readOnly={true}/>
          </fieldset>
          <fieldset className="mb-2">
            <label htmlFor="name">Name:</label>
            <Input placeholder="Name: e.g: My token" {...form.register('name')} readOnly={true}/>
          </fieldset>
          <fieldset className="mb-2">
            <label htmlFor="symbol">Symbol:</label>
            <Input placeholder="Symbol: e.g: MYT" {...form.register('symbol')} readOnly={true}/>
          </fieldset>
          <fieldset className="mb-2">
            <label htmlFor="decimals">Decimals:</label>
            <Input type="number" placeholder="Decimals: e.g: 18" {...form.register('decimals')} readOnly={true}/>
          </fieldset>
          <fieldset className="mb-2">
            <label htmlFor="initialSupply">Total Supply:</label>
            <Input type="number" placeholder="Initial supply: e.g: 1000000" {...form.register('totalSupply')}/>
            <p className="text-red-500">{form.formState.errors?.totalSupply?.message ?? ""}</p>
          </fieldset>
          <div className="mt-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
  );
}