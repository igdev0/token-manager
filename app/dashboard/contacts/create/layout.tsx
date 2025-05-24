import {Metadata} from 'next';
import {PropsWithChildren} from 'react';

export const metadata: Metadata = {
  title: "Token manager / Dashboard / Contacts / Create",
  description: "A token manager that allows you to manage your fungible and non-fungible tokens.",
};


export default function Layout(props: PropsWithChildren) {
  return (
      <>
        {props.children}
      </>
  );
}