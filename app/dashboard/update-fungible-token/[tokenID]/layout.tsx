import {PropsWithChildren} from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Token manager",
  description: "A token manager that allows you to manage your fungible and non-fungible tokens.",
};

export default function Layout(props: PropsWithChildren) {
  return (
      <>
        {props.children}
      </>
  );
}