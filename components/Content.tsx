import Link from 'next/link'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { ContentModal, Pagination, NoItem, LoaderLine, SanitizedText } from '@/components'
import { AiOutlineRead, AiOutlineMessage } from 'react-icons/ai'
import { FcBookmark } from 'react-icons/fc'
import { FaFeatherAlt } from 'react-icons/fa'
import { MdFitScreen } from 'react-icons/md'
import { WORDS_PER_PAGE } from '@/constants'
import { format } from '@/lib/dateFormat'
import useInfoModal from '@/hooks/useInfoModal'
import useNovel from '@/hooks/useNovel'

interface ContentProps {
   scrollHeight: number;
}

const Content: React.FC<ContentProps> = ({ scrollHeight }) => {
   const router = useRouter();
   const novelId = router.query.novel as string;
   const { data: selectedNovel, isLoading } = useNovel(novelId);
   const { isOpen, openModal, closeModal } = useInfoModal();

   /* Pagination */
   const [currentPage, setCurrentPage] = useState(1);
   const innerContainerRef = useRef<HTMLDivElement | null>(null);
   const lines = selectedNovel?.content.split(/\n|\r\n|\r/);
   const totalPages = Math.ceil(selectedNovel?.content?.length / scrollHeight);
   const totalPagesForModal = Math.ceil(selectedNovel?.content?.length / WORDS_PER_PAGE);
   
   const handlePageChange = (page: number) => {
      setCurrentPage(page);
      scrollToPage(page);
   };

   const scrollToPage = (page: number) => {
      if (innerContainerRef.current) {
         const targetLineIndex = (page - 1) * scrollHeight;
         const targetLineElement = innerContainerRef.current.children[targetLineIndex] as HTMLElement;
         if (targetLineElement) {
            targetLineElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
         }
      }
   };

   return (
      <div className="pl-10 md:pl-36 md:pr-24 pr-4 md:mr-4 text-justify relative w-full h-auto">
         {selectedNovel ? (
            <>
               <div className="flex flex-col md:flex-row justify-between md:items-center mb-2 pt-3 md:pb-4 pb-2 my-4 pr-6">
                   {/* Title & Info */}
                  <div className="flex items-center text-primary-black text-xl md:text-2xl lg:text-4xl font-bold uppercase md:mb-0 mb-2">
                     <Link href={`/profile/lounge/${selectedNovel?.id}`} className="cursor-pointer">
                        <FcBookmark />
                     </Link>
                     {selectedNovel?.title}
                     {selectedNovel && (
                        <div className="ml-3 flex items-center gap-1 bg-primary-light text-primary-dark py-1 px-2 rounded-lg">
                           <Link href={`/profile/lounge/${selectedNovel?.id}`} title="Read Mode" className=" hover:text-primary-red-200"><AiOutlineRead size={30} /></Link>
                           <Link href={`/profile/blog/${selectedNovel?.id}`} title="Leave Comment" className=" hover:text-primary-red-200"><AiOutlineMessage size={24} /></Link>
                        </div>
                     )}
                  </div>
                  <div className="flex flex-col items-end gap-1 leading-tight md:pr-4 pr-2">
                     <div className="flex flex-row md:gap-2 gap-1 items-center justify-end">
                        <FaFeatherAlt color={'#c3aeca'} size={15} className="max-sm:hidden" />
                        <FaFeatherAlt color={'#c3aeca'} size={12} className="sm:hidden" />
                        <p className="text-gray-400 md:text-base text-[10px] italic">by {selectedNovel?.author}</p>
                     </div>
                     <p className="text-gray-500 md:text-sm text-[10px]">{format(selectedNovel?.createdAt)}</p>
                  </div>
               </div>
               <div className="md:h-[640px] h-[450px] min-h-full overflow-y-scroll overflow-x-hidden border-b-2 flex flex-col">
                  {/* Main content */}
                  <div className="text-black md:text-base text-[11px] md:leading-7 leading-5 md:mb-6 mb-4 md:pr-4 pr-2 md:pt-2 pt-1"
                     style={{ height: '400px', scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}>
                        {currentPage === 1 && selectedNovel?.quote && (
                           <div className="novel-id-quote">{selectedNovel.quote}</div>
                        )}
                        <div className="flex flex-col h-full prose lg:prose-xl" ref={innerContainerRef}>
                           {lines && lines.map((line: string, index: number) => (
                              <div key={index} id={`line-${index}`} className="flex-1 items-center md:mb-2 mb-1">
                                 <SanitizedText paragraph={line} />
                              </div>
                           ))}
                        </div>
                  </div>
               </div>
               <div className="py-2">
                  {/* Full Screen */}
                  <ContentModal 
                       visible={isOpen} 
                       onClose={closeModal} 
                       pagination={{ totalPages: totalPagesForModal, currentPage, onPageChange: handlePageChange }} />
                  <div className="flex justify-end items-center gap-1 group/item md:w-40 w-24 text-gray-400 transition cursor-pointer ml-auto"
                       onClick={() => openModal(selectedNovel?.id)}>
                      <p className="md:text-lg text-[10px] uppercase group-hover/item:text-primary-black">Full screen</p>
                      <MdFitScreen size={20} className="text-gray-400 group-hover/item:text-primary-black max-sm:hidden"/>
                      <MdFitScreen size={15} className="text-gray-400 group-hover/item:text-primary-black sm:hidden"/>
                  </div>
                  {/* Pagination */}
                  {totalPages > 1 && (
                  <Pagination
                     totalPages={totalPages}
                     currentPage={currentPage}    
                     onPageChange={handlePageChange}
                  />)}
               </div>
            </>
         ) : (isLoading) ? (
            <LoaderLine />
         ) : (selectedNovel !== novelId) ? (
            <p className="text-red-500 md:text-xl text-sm font-semibold p-4">Novel not found</p>
         ) : (!selectedNovel) ? (
            <NoItem variation={'ns'} linkHref="/" title="No Selected Novel" description="Click on any novel to select and read it." imageSrc="/images/book.png" imageAlt="No Content Yet" />
         ) : (
            null
         )}
      </div>
  )
}

export default Content