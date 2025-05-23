"use client";
import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {getToken} from '@/app/dashboard/update-fungible-token/[tokenID]/actions';
import {Token} from '@/app/dashboard/page';

export default function UpdateFungibleToken() {
  const params = useParams<{tokenID: string}>();
  const [data, setData] = useState<Token | null>(null);
  useEffect(() => {
    getToken(params.tokenID).then(setData).catch(console.error);
  }, [params])

  if(!data) {
    return (
        <div
            className="w-[40] aspect-square border-2 border-gray-900 border-r-transparent border-b-transparent rounded-full animate-spin mx-auto"/>
    )
  }

  return (
      <div>

      </div>
  )
}