"use client";
import WalletSelector from '@/components/wallet-selector';
import {useWalletStore} from '@/store/wallet';
import Link from 'next/link';

export default function Navbar() {
  const authenticated = useWalletStore().authenticated;
  return (
      <div className="navbar px-2">
        <div className="container mx-auto flex justify-between py-2">
          <div className="inline-flex justify-between gap-2 items-center">
            <img src="/logo.svg" alt="icon"/>
            Guardo
          </div>
          <div className="flex gap-2 items-center">
            {authenticated && <Link href="/dashboard" className="px-3">Dashboard</Link>}
            <WalletSelector/>
          </div>
        </div>
      </div>
  );
}