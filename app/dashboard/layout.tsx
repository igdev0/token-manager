import type {Metadata} from "next";
import {ReactNode} from 'react';
import "./style.css";
import {Button} from '@/components/ui/button';
import Link from 'next/link';

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
      <div className="w-full h-full max-w-[1200] mx-auto gap-4 flex flex-col">
        <div className="tabs flex justify-end">
          <Button asChild={true}>
            <Link href="/dashboard/create-fungible-token">
              New Fungible
            </Link>
          </Button>
          <Button variant="secondary">
            New Non-fungible</Button>
        </div>
        {children}
      </div>
  );
}
