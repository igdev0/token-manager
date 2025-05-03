"use client";
import {Route, Routes} from 'react-router';
import Landing from '@/screens/landing.tsx';
import {useEffect} from 'react';
import {useWalletStore} from '@/store/wallet.ts';
import useAppStore from '@/store/app.ts';


function App() {
  const wallet = useWalletStore();
  const app = useAppStore();

  useEffect(() => {
    app.setLoading(wallet.initialized)
  }, [wallet.initialized])

  useEffect(() => {
    wallet.init().catch();
    return () => {
      wallet.cleanup()
    }
  }, []);

  return (
      <Routes>
        <Route path="/" element={<Landing/>}/>
      </Routes>
  )
}

export default App
