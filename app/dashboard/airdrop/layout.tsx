import {PropsWithChildren} from 'react';
import {Metadata} from 'next';

export const metadata:Metadata = {
  title: "Token manager / Dashboard / Airdrop",
  description: "A token manager that allows you to manage your fungible and non-fungible tokens.",
}

export default function Layout({children}: PropsWithChildren) {
  return (
      <>
        {children}
      </>
  )
}