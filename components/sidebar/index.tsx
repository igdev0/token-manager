"use client";
import Link from 'next/link';
import {Coins, Contact, ImageIcon, LayoutDashboardIcon} from 'lucide-react';
import {clsx} from 'clsx';
import {usePathname} from 'next/navigation';
import Logo from '@/components/logo';

export default function Sidebar() {
  const path = usePathname();
  const linkCls = clsx(`flex gap-4 items-center px-4 text-nowrap overflow-hidden py-2`);
  const iconCls = clsx("shrink-0");
  return (
      <div className="tabs flex flex-col hover:w-[300] w-[65] overflow-hidden transition-all duration-300 bg-gray-200 h-full">
        <Link className={linkCls} href="/dashboard">
          <Logo className={iconCls}/>
          <strong>Token manager</strong>
        </Link>
        <Link href="/dashboard" className={clsx(linkCls, path === '/dashboard' && 'text-gray-900 bg-gray-400')}>
          <LayoutDashboardIcon className={iconCls}/>
          Tokens
        </Link>
        <Link href="/dashboard/create-fungible-token" className={linkCls}>
          <Contact className={iconCls}/>
          Contacts
        </Link>
        <Link href="/dashboard/create-fungible-token" className={linkCls}>
          <Coins className={iconCls}/>
          Create Fungible
        </Link>
        <Link href="/dashboard/create-fungible-token" className={linkCls}>
          <ImageIcon className={iconCls}/>
          Create Non-fungible
        </Link>
      </div>
  )
}