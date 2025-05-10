"use client";
import Navbar from '@/components/navbar';
import {Button} from '@/components/ui/button';
import {useWalletStore} from '@/store/wallet';
import {useEffect} from 'react';
import Background from '@/components/background';

export default function Home() {
  const wallet = useWalletStore();

  useEffect(() => {
    wallet.init().catch();
    return () => {
      wallet.cleanup();
    };
  }, []);

  if (!wallet.initialized) {
    return (
        <h1>Loading ...</h1>
    );
  }
  return (
      <div className="px-2">
        <Background/>
        <Navbar/>
        <header className="mt-70">
          <h1 className="text-6xl font-bold text-center mb-2">The token manager</h1>
          <h1 className="text-2xl font-bold text-center max-w-[600px] mx-auto text-balance mb-4">That allows you to easly manage fungible and non-fungible tokens.</h1>
          <div className="max-w-[600px] mx-auto flex justify-center gap-2">
            <Button>
              Get started
            </Button>
            <Button variant="ghost">
              Learn how
            </Button>
          </div>
        </header>
      </div>
  );
}
