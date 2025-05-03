import logo from "../../assets/logo.svg";
import WalletSelector from '@/components/wallet-selector';
import {Link} from 'react-router';
import {useWalletStore} from '@/store/wallet.ts';

export default function Navbar() {
  const authenticated = useWalletStore().authenticated;
  return (
      <div className="navbar px-2">
        <div className="container mx-auto flex justify-between py-2">
          <div className="inline-flex justify-between gap-2 items-center">
            <img src={logo} alt="icon"/>
            Guardo
          </div>
          <div className="flex gap-2 items-center">
            {authenticated && <Link to="/dashboard" className="px-3">Dashboard</Link>}
            <WalletSelector/>
          </div>
        </div>
      </div>
  );
}