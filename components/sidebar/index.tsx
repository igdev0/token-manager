"use client";
import Link from 'next/link';
import {Coins, Contact, ImageIcon, LayoutDashboardIcon, PlaneTakeoff} from 'lucide-react';
import {clsx} from 'clsx';
import {usePathname} from 'next/navigation';
import Logo from '@/components/logo';

export default function Sidebar() {
  const path = usePathname();
  const linkCls = clsx(`flex gap-4 items-center px-4 text-nowrap overflow-hidden py-2`);
  const iconCls = clsx("shrink-0");

  const activeCls = clsx("bg-black text-white");
  return (
      <div className="tabs flex flex-col hover:w-[300] w-[65] overflow-hidden transition-all duration-300 bg-gray-200 h-full">
        <Link className={clsx("flex gap-4 text-nowrap px-4 py-4 items-center bg-white")} href="/dashboard">
          <Logo className={iconCls}/>
          <strong>Token manager</strong>
        </Link>
        <Link href="/dashboard" className={clsx(linkCls, path === '/dashboard' && activeCls)}>
          <LayoutDashboardIcon className={iconCls}/>
          Tokens
        </Link>
        <Link href="/dashboard/contacts" className={clsx(linkCls, path === '/dashboard/contacts' && activeCls)}>
          <Contact className={iconCls}/>
          Contacts
        </Link>
        <Link href="/dashboard/create-fungible-token" className={clsx(linkCls, path === '/dashboard/create-fungible-token' && activeCls)}>
          <Coins className={iconCls}/>
          Create Fungible
        </Link>
        <Link href="/dashboard/airdrop" className={clsx(linkCls, path === '/dashboard/airdrop' && activeCls)}>
          <PlaneTakeoff className={iconCls}/>
          Airdrop
        </Link>
        <Link href="/dashboard/create-fungible-token" className={linkCls}>
          <ImageIcon className={iconCls}/>
          Create Non-fungible
        </Link>
      </div>
  )
}