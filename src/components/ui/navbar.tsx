import logo from "../../assets/logo.svg";
import {Button} from '@/components/ui/button.tsx';
import {Wallet} from 'lucide-react';

export default function Navbar() {
  return (
      <div className="navbar">
        <div className="container mx-auto flex justify-between py-2">
          <div className="inline-flex justify-between gap-2 items-center">
            <img src={logo} alt="icon"/>
            Guardo
          </div>
          <Button variant="default">Connect <Wallet/></Button>
        </div>
      </div>
  );
}