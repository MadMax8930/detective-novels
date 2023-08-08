import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useNovel from '@/hooks/useNovel'
import { Pagination } from '@/components'

interface ContentProps {
   linesPerPage: number;
}

const Content: React.FC<ContentProps> = ({ linesPerPage }) => {
   const router = useRouter();
   const novelId = router.query.novel as string;

   const { data: selectedNovel } = useNovel(novelId);

   /* Pagination */

   const [currentPage, setCurrentPage] = useState(1);
   const handlePageChange = (page: number) => { setCurrentPage(page) };

   const lines = selectedNovel?.content.split('\n');
   const totalPages = Math.ceil(lines?.length / linesPerPage);

   const startIdxLine = (currentPage - 1) * linesPerPage;
   const endIdxLine = currentPage * linesPerPage;

   const visibleLines = lines?.slice(startIdxLine, endIdxLine);

   useEffect(() => {
      if (currentPage > totalPages) {
         setCurrentPage(totalPages);
      }
   }, [totalPages, currentPage]);
 
   return (
      <div className="pt-10 pb-16 px-36 text-justify">
         {selectedNovel ? (
            <>
               <div className="flex flex-row justify-between items-center">
                  <p className="text-black-100 text-1xl md:text-3xl font-bold uppercase">{selectedNovel?.title}</p><br /> 
                  <p className="text-gray-400">{selectedNovel?.createdAt}</p>
               </div>
               <div className="text-black text-base font-serif pt-4">
                  {visibleLines?.join(' ')}
               </div>
               <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}    
                  onPageChange={handlePageChange}
               />
            </>
         ) : selectedNovel !== novelId ? (
            <p className="text-red-500 text-xl font-semibold">Novel not found</p>
         ) : (
            null
         )}
      </div>
  )
}

export default Content