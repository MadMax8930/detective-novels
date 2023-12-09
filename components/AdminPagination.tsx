import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ITEMS_PER_PAGE } from '@/constants'

const AdminPagination = ({ totalItems, pageQuery } : { totalItems: number, pageQuery: string }) => {
   const { replace } = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const hasPrev = ITEMS_PER_PAGE * (parseInt(pageQuery)-1) > 0;
   const hasNext = ITEMS_PER_PAGE * (parseInt(pageQuery)-1) + ITEMS_PER_PAGE < totalItems;
   
   const handleChangePage = (type: string) => {
      const params = new URLSearchParams(searchParams.toString());
      type == "prev" 
         ? params.set("portion", (parseInt(pageQuery) - 1).toString()) 
         : params.set("portion", (parseInt(pageQuery) + 1).toString());
      replace(`${pathname}?${params}`);
   };
  
  return (
    <div className="flex justify-between p-2.5 mt-4">
      <button className={`py-1.5 px-3 ${!hasPrev ? 'bg-slate-600 cursor-not-allowed' : 'bg-slate-300 cursor-pointer'}`} 
               disabled={!hasPrev} onClick={() => handleChangePage("prev")}>Previous</button>
      <button className={`py-1.5 px-3 ${!hasNext ? 'bg-slate-600 cursor-not-allowed' : 'bg-slate-300 cursor-pointer'}`} 
               disabled={!hasNext} onClick={() => handleChangePage("next")}>Next</button>
    </div>
  )
}

export default AdminPagination
