import {useWalletStore} from '@/store/wallet.ts';
import {Navigate, Outlet} from 'react-router';

export default function ProtectedRoute() {
  const wallet = useWalletStore();
  return wallet.authenticated ? <Outlet/> : <Navigate to="/"/>
}