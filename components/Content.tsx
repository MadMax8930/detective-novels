import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import useNovel from '@/hooks/useNovel'
import useInfoModal from '@/hooks/useInfoModal'
import { Pagination } from '@/components'
import { FcBookmark } from 'react-icons/fc'
import { FaFeatherAlt } from 'react-icons/fa'
import { RiFullscreenLine } from 'react-icons/ri'
import { formatDate } from '@/lib/date'
import { Loader } from '@/components'

interface ContentProps {
   linesPerPage: number;
}

const Content: React.FC<ContentProps> = ({ linesPerPage }) => {
   const router = useRouter();
   const novelId = router.query.novel as string;
   const { data: selectedNovel, isLoading } = useNovel(novelId);
   const { openModal } = useInfoModal();

   /* Pagination */
   const [currentPage, setCurrentPage] = useState(1);
   const innerContainerRef = useRef<HTMLDivElement | null>(null);
   const lines = selectedNovel?.content.split('\n');
   const totalPages = Math.ceil(lines?.length / linesPerPage);

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
      scrollToPage(page);
   };

   const scrollToPage = (page: number) => {
      if (innerContainerRef.current) {
         const targetLineIndex = (page - 1) * linesPerPage;
         const targetLineElement = innerContainerRef.current.children[targetLineIndex] as HTMLElement;
         if (targetLineElement) {
            targetLineElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
         }
      }
   };

   return (
      <div className="pb-6 pt-12 pl-36 pr-24 mr-4 text-justify relative">
         {selectedNovel ? (
            <>
               <div className="flex flex-col md:flex-row justify-between items-center pt-6 pb-2 my-4 pr-6">
                   {/* Title & Info */}
                  <p className="flex items-center text-black-100 text-2xl md:text-4xl font-bold uppercase">
                     <FcBookmark />{selectedNovel?.title}
                  </p>
                  <div className="flex flex-col leading-tight pr-4">
                     <div className="flex flex-row gap-2 items-center justify-end">
                        <FaFeatherAlt color={'#c3aeca'} size={15} />
                        <p className="text-gray-400 text-md italic">by {selectedNovel?.author}</p>
                     </div>
                     <p className="text-gray-500 text-sm">{formatDate(selectedNovel?.createdAt)}</p>
                  </div>
               </div>
               <div className="h-[610px] min-h-full overflow-y-scroll overflow-x-hidden">
                  {/* Main content */}
                  <div className="text-black text-base font-serif leading-7 mb-6 pr-4 pt-2"
                     style={{ height: `${linesPerPage * 1.55}em`, scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}>
                        <div className="flex flex-col h-full" ref={innerContainerRef}>
                           {lines && lines.map((line: string, index: number) => (
                              <div key={index} id={`line-${index}`} className="flex-1 items-center mb-2">
                                 {line}
                              </div>
                           ))}
                        </div>
                  </div>
               </div>
               <div className="pt-2 my-4">
                  {/* Full Screen */}
                  <div className="flex justify-end items-center gap-1 group/item w-40 text-gray-400 transition cursor-pointer ml-auto"
                       onClick={() => openModal(selectedNovel?.id)}>
                      <p className="text-lg uppercase group-hover/item:text-primary-red">Full screen</p>
                      <RiFullscreenLine size={20} className="text-black-100 group-hover/item:text-primary-red"/>
                  </div>
                  {/* Pagination */}
                  <Pagination
                     totalPages={totalPages}
                     currentPage={currentPage}    
                     onPageChange={handlePageChange}
                  />
               </div>
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