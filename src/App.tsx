"use client";
import {Route, Routes} from 'react-router';
import Landing from '@/screens/landing.tsx';
import {useEffect} from 'react';
import {useWalletStore} from '@/store/wallet.ts';
import {Toaster} from '@/components/ui/sonner.tsx';


function App() {
  const wallet = useWalletStore();

  useEffect(() => {
    wallet.init().catch();
    return () => {
      wallet.cleanup();
    };
  }, []);

  if(!wallet.initialized) {
    return (
        <h1>Loading ...</h1>
    )
  }

  return (
      <>
        <Toaster/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
        </Routes>
      </>
  );
}

export default App;
