"use client";
import {BrowserProvider, ethers} from 'ethers';
import ERC20Token from '@/artifacts/contracts/ERC20Token.sol/ERC20Token.json';
import {useWalletStore} from '@/store/wallet';
import {Form} from '@/components/ui/form';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {storeToken} from '@/app/dashboard/create-fungible-token/actions';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object({
  name: yup.string().required(),
  symbol: yup.string().required(),
  initialSupply: yup.number().positive().required(),
  decimals: yup.number().positive().required(),
})
    .required();

interface Inputs {
  name: string;
  symbol: string;
  initialSupply: number;
  decimals: number;
}

export default function CreateFungibleTokenPage() {
  const wallet = useWalletStore();

  const form = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const createFungibleToken = async () => {
    if (wallet.currentProvider) {
      const values = form.getValues();
      const browserProvider = new BrowserProvider(wallet.currentProvider.provider);
      const signer = await browserProvider.getSigner(wallet.accounts[0]);
      const factory = new ethers.ContractFactory(ERC20Token.abi, ERC20Token.bytecode, signer);
      const deploy = await factory.deploy(values.name, values.symbol, values.initialSupply, values.decimals);
      const token = await deploy.waitForDeployment();
      const tokenAddress = await token.getAddress();
      await storeToken(values.name, values.symbol, tokenAddress, "Fungible");
    }
  };

  return (
      <Form {...form}>
        <h1 className="text-2xl font-extrabold">Create new token</h1>
        <form className="max-w-[900] flex flex-col gap-2" onSubmit={form.handleSubmit(createFungibleToken)}>
          <fieldset>
            <label htmlFor="name">Name:</label>
            <Input placeholder="Name: e.g: My token" {...form.register('name')}/>
            <p className="text-red-500">{form.formState.errors?.name?.message??""}</p>
          </fieldset>
          <fieldset>
            <label htmlFor="symbol">Symbol:</label>
            <Input placeholder="Symbol: e.g: MYT" {...form.register('symbol')}/>
            <p className="text-red-500">{form.formState.errors?.symbol?.message??""}</p>
          </fieldset>
          <fieldset>
            <label htmlFor="decimals">Decimals:</label>
            <Input type="number" placeholder="Decimals: e.g: 18" {...form.register('decimals')}/>
            <p className="text-red-500">{form.formState.errors?.decimals?.message??""}</p>
          </fieldset>
          <fieldset>
            <label htmlFor="initialSupply">Initial Supply:</label>
            <Input type="number" placeholder="Initial supply: e.g: 1000000" {...form.register('initialSupply')}/>
            <p className="text-red-500">{form.formState.errors?.initialSupply?.message??""}</p>
          </fieldset>
          <div className="mt-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
  );
}