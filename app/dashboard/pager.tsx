"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import {useSearchParams} from 'next/navigation';

export default function Pager({maxPagers = 10, totalPages = 0}) {
  const params = useSearchParams();
  const page = Number(params.get("page") ?? 0);
  const perPage = Number(params.get("perPage") ?? 10);

  return (
      <div className="flex justify-center gap-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={`?page=${page - 1 == 0 ? 1 : page -1}&perPage=${perPage}`}/>
            </PaginationItem>
            {
              Array.from({length: maxPagers}).map((_, i) => (

                  <PaginationItem>
                    <PaginationLink isActive={i+1 === page} href={`?page=${i + 1}&perPage=${perPage}`}>{i+1}</PaginationLink>
                  </PaginationItem>
              ))
            }
            <PaginationItem>
              <PaginationNext href={`?page=${page + 1 > totalPages ? totalPages : page + 1}&perPage=${perPage}`}/>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
  );
}