import type {Metadata} from "next";
import {ReactNode} from 'react';
import "./style.css";
import Sidebar from '@/components/sidebar';
import WalletSelector from '@/components/wallet-selector';

export const metadata: Metadata = {
  title: "Token manager / Dashboard",
  description: "A token manager that allows you to manage your fungible and non-fungible tokens.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {

  return (
      <div className="w-full h-screen mx-auto gap-4 flex">
        <Sidebar/>
        <div className="w-full max-w-[1600] mx-auto px-2">
          <div className="container mx-auto py-2 flex justify-end">
            <WalletSelector/>
          </div>
          {children}
        </div>
      </div>
  );
}
