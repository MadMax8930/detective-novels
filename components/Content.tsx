import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useNovel from '@/hooks/useNovel'
import { Pagination } from '@/components'
import { FcBookmark } from 'react-icons/fc'
import { FaFeatherAlt } from 'react-icons/fa'
import { formatDate } from '@/lib/date'
import { Loader } from '@/components'

interface ContentProps {
   linesPerPage: number;
}

const Content: React.FC<ContentProps> = ({ linesPerPage }) => {
   const router = useRouter();
   const novelId = router.query.novel as string;
   const { data: selectedNovel, isLoading } = useNovel(novelId);

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
      <div className="pb-6 pt-12 px-36 text-justify">
         {selectedNovel ? (
            <>
               <div className="flex flex-row justify-between items-center">
                  <p className="flex flex-row items-center text-black-100 text-1xl md:text-4xl font-bold uppercase">
                     <FcBookmark />{selectedNovel?.title}
                  </p><br />
                  <div className="flex flex-col leading-tight">
                     <div className="flex flex-row gap-2 items-center justify-end">
                        <FaFeatherAlt color={'#c3aeca'} />
                        <p className="text-gray-400 text-md italic">by {selectedNovel?.author}</p>
                     </div>
                     <p className="text-gray-500 text-sm">{formatDate(selectedNovel?.createdAt)}</p>
                  </div>
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
         ) : (isLoading) ? (
            <div className="relative bottom-96"><Loader/></div>
         ) : (selectedNovel !== novelId) ? (
            <p className="text-red-500 text-xl font-semibold">Novel not found</p>
         ) : (
            null
         )}
      </div>
  )
}

export default Content