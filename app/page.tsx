"use client";
import {Button} from '@/components/ui/button';
import {useWalletStore} from '@/store/wallet';
import Navbar from '@/components/navbar';
import Spinner from '@/components/spinner';

export default function Home() {
  const wallet = useWalletStore();


  if (!wallet.initialized) {
    return (
        <Spinner/>
    );
  }
  return (
      <>
        <Navbar/>
        <div className="px-2">
          <header className="mt-70">
            <h1 className="text-6xl font-bold text-center mb-2">The token manager</h1>
            <h1 className="text-2xl font-bold text-center max-w-[600px] mx-auto text-balance mb-4">A tool that allows
              you to manage fungible and non-fungible tokens.</h1>
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
      </>
  );
}
