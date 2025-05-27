"use client";
import {Button} from '@/components/ui/button';
import {Pen, Plus} from 'lucide-react';
import {useEffect, useState} from 'react';
import {getTokens, getTotalTokens} from '@/app/dashboard/actions';
import {$Enums} from '@/lib/generated/prisma';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import Spinner from '@/components/spinner';
import {BrowserProvider, ethers} from 'ethers';
import {useWalletStore} from '@/store/wallet';
import ERC20Token from '@/artifacts/contracts/ERC20Token.sol/ERC20Token.json';
import {toast} from 'sonner';

export type Token = {
  id: string
  name: string
  symbol: string
  address: string
  owner: string
  type: $Enums.TokenKind
  chain_id: string
  network_name: string
  created_at: Date
  updated_at: Date
}
const MAX_PAGERS = 10;
export default function Dashboard() {
  const [data, setData] = useState<Token[] | null>(null);
  const params = useSearchParams();
  const page = Number(params.get("page") ?? 1);
  const perPage = Number(params.get("perPage") ?? 10);
  const [totalPages, setTotalPages] = useState(0);
  const wallet = useWalletStore();

  const addToWallet = (address: string) => (
      async () => {
        if(wallet.currentProvider?.provider) {
          const browserProvider = new BrowserProvider(wallet.currentProvider.provider);
          const signer = await browserProvider.getSigner(wallet.accounts[0]);
          const contract = new ethers.Contract(address, ERC20Token.abi, signer);
          const tokenDecimals = await contract.decimals();
          const tokenSymbol = await contract.symbol();
          const options = {
            address: address,
            symbol: tokenSymbol,
            decimals: Number(tokenDecimals),
          }
          try {
            const wasAdded = await wallet.currentProvider.provider.request({
              method: "wallet_watchAsset",
              params: {
                type: 'ERC20', // For ERC-20 tokens
                options,
              },
            })
            wasAdded && toast("Token added successfully", {position: "top-right", classNames: {content: "text-green-500"}});
          } catch (err) {
            console.log(err);
            toast("Failed while trying to add token to wallet", {position: "top-right", classNames: {content: "text-red-500"}});
          }

        }
      }
  );

  useEffect(() => {
    if (page > 0) {
      getTotalTokens().then(v => setTotalPages(Math.ceil(v / perPage))).catch(console.error);
      getTokens(page, perPage).then(setData).catch(console.error);
    } else {
      setData([]);
    }
  }, [page, perPage]);

  if (!data) {
    return (
        <Spinner/>
    );
  }

  if (!data.length) {
    return (
        <div className="text-center">
          <h1 className="text-2xl font-bold"> No tokens created.</h1>
          <p className="mb-4">Create a fungible or non-fungible token and will be displayed here</p>
          <div className="flex gap-2 justify-center">
            <Button asChild>
              <Link href="/dashboard/create-fungible-token">Create Fungible</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/create-fungible-token">Create Non-Fungible</Link>
            </Button>
          </div>
        </div>
    );
  }

  return (
      <div className="flex justify-center flex-col items-center">
        <table className="w-full">
          <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Kind</th>
            <th className="text-left p-2">Address</th>
            <th className="text-left p-2">Network</th>
            <th className="text-left p-2"></th>
          </tr>
          </thead>
          <tbody>
          {
            data?.map(({id, name, symbol, address, network_name, type}) => (
                <tr key={id}>
                  <td className="p-2">{name} ({symbol})</td>
                  <td className="p-2">{type}</td>
                  <td className="p-2">{address}</td>
                  <td className="p-2">{network_name}</td>
                  <td className="p-2 gap-2 flex">
                    <Button asChild><Link href={`/dashboard/update-fungible-token/${id}`}><Pen/>Make
                      changes</Link></Button>
                    <Button onClick={addToWallet(address)}><Plus/>Add to wallet</Button>
                  </td>
                </tr>
            ))
          }
          </tbody>
        </table>
        <div className="flex justify-center gap-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className={page - 1 === 0 ? "opacity-20 cursor-not-allowed" : ""}
                                    href={page - 1 === 0 ? '#' : `?page=${page - 1}`}/>
              </PaginationItem>
              {
                Array.from({length: totalPages}).map((_, i) => (

                    <PaginationItem key={i}>
                      <PaginationLink isActive={i + 1 === page}
                                      href={`?page=${i + 1}`}>{i + 1}</PaginationLink>
                    </PaginationItem>
                ))
              }
              <PaginationItem>
                <PaginationNext className={page - 1 === 0 ? "opacity-20 cursor-not-allowed" : ""}
                                href={page + 1 > data.length ? '#' : `?page=${page + 1}`}/>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
  );
}