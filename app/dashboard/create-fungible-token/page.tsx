"use client";
import {BrowserProvider, ethers} from 'ethers';
import ERC20Token from '@/artifacts/contracts/ERC20Token.sol/ERC20Token.json';
import {useWalletStore} from '@/store/wallet';
import {Form} from '@/components/ui/form';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

interface Inputs {
  name: string;
  symbol: string;
  initialSupply: string;
  decimals: string;
}

export default function CreateFungibleTokenPage() {
  const wallet = useWalletStore();

  const form = useForm<Inputs>();

  const createFungibleToken = async () => {
    if (wallet.currentProvider) {
      const values = form.getValues();
      const browserProvider = new BrowserProvider(wallet.currentProvider.provider);
      const signer = await browserProvider.getSigner(wallet.accounts[0]);
      const factory = new ethers.ContractFactory(ERC20Token.abi, ERC20Token.bytecode, signer);
      await factory.deploy(values.name, values.symbol, values.initialSupply, values.decimals);
    }
  };

  return (
      <Form {...form}>
        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(createFungibleToken)}>
          <fieldset>
            <label htmlFor="name">Name:</label>
            <Input placeholder="Name: e.g: My token" {...form.register('name')}/>
          </fieldset>
          <fieldset>
            <label htmlFor="symbol">Symbol:</label>
            <Input placeholder="Symbol: e.g: MYT" {...form.register('symbol')}/>
          </fieldset>
          <fieldset>
            <label htmlFor="decimals">Decimals:</label>
            <Input type="number" placeholder="Decimals: e.g: 18" {...form.register('decimals')}/>
          </fieldset>
          <fieldset>
            <label htmlFor="initialSupply">Initial Supply:</label>
            <Input type="number" placeholder="Initial supply: e.g: 1000000" {...form.register('initialSupply')}/>
          </fieldset>
          <div>
          <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
  );
}