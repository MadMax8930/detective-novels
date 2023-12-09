import React from 'react';
import { MdSearch } from 'react-icons/md';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const AdminSearch = ({ placeholder } : { placeholder: string }) => {
   const { replace } = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const handleSearch = useDebouncedCallback((e) => {
      const params = new URLSearchParams(searchParams);
      params.set("p", 1); // page query

      const searchValue = e.target.value.trim();
      if (searchValue) {
         searchValue.length > 2 && params.set("q", searchValue); // search query
      } else {
         params.delete("q");
      }

      replace(`${pathname}?${params}`);
   }, 500);

  return (
    <div className="flex items-center bg-admin-third gap-2.5 p-2.5 rounded-xl w-max">
      <MdSearch />
      <input type="text" placeholder={placeholder} 
         className="bg-transparent text-white-main border-none outline-none" onChange={handleSearch} />
    </div>
  )
}

export default AdminSearch