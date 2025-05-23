"use client";
import {Button} from '@/components/ui/button';
import {Pen} from 'lucide-react';
import Pager from '@/app/dashboard/pager';
import {useEffect, useState} from 'react';
import {getTokens} from '@/app/dashboard/actions';
import {$Enums} from '@/lib/generated/prisma';
import Link from 'next/link';

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
export default function Dashboard() {
  const [data, setData] = useState<Token[] | null>(null);
  useEffect(() => {
    getTokens().then(setData).catch(console.error);
  }, []);

  if (!data) {
    return (
        <div
            className="w-[40] aspect-square border-2 border-gray-900 border-r-transparent border-b-transparent rounded-full animate-spin mx-auto"/>
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
      <div>
        <table>
          <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Kind</th>
            <th className="text-left p-2">Address</th>
            <th className="text-left p-2">Network</th>
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
                  <td className="p-2"><Button><Pen/></Button></td>
                </tr>
            ))
          }
          </tbody>
        </table>
        <Pager/>
      </div>
  );
}