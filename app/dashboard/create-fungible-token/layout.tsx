import type {Metadata} from "next";
import {ReactNode} from 'react';
import "./style.css";

export const metadata: Metadata = {
  title: "Token manager / Dashboard / Create fungible token",
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
