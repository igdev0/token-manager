import type {Metadata} from "next";
import {ReactNode} from 'react';

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
      <>
        {children}
      </>
  );
}
