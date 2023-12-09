import React from 'react'
import { ITEMS_PER_PAGE } from '@/constants'
import { useAdminNavigation } from '@/hooks/useAdminNavigation'

const AdminPagination = ({ totalItems, pageQuery } : { totalItems: number, pageQuery: string }) => {
   const { navigateToUrl } = useAdminNavigation();

   const hasPrev = ITEMS_PER_PAGE * (parseInt(pageQuery)-1) > 0;
   const hasNext = ITEMS_PER_PAGE * (parseInt(pageQuery)-1) + ITEMS_PER_PAGE < totalItems;
   
   const handleChangePage = (type: string) => {
      type == "prev" 
         ? navigateToUrl((parseInt(pageQuery) - 1).toString()) 
         : navigateToUrl((parseInt(pageQuery) + 1).toString());
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
