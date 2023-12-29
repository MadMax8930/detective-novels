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
      <div className="md:px-8 px-2 text-justify relative w-full h-auto">
         {selectedNovel ? (
            <>
               {/* Top Info */}
               <div className="flex flex-col justify-between">
                  <div className="profile-novel-information">
                     <div className="profile-novel-title">
                        <Link href={`/profile/lounge/${selectedNovel?.id}`} className="cursor-pointer"><FcBookmark /></Link>
                        {selectedNovel?.title}
                        {selectedNovel && (
                           <div className="profile-novel-buttons">
                              <Link href={`/profile/lounge/${selectedNovel?.id}`} title="Read Mode" className=" hover:text-primary-red-200"><AiOutlineRead size={30} /></Link>
                              <Link href={`/profile/blog/${selectedNovel?.id}`} title="Leave Comment" className=" hover:text-primary-red-200"><AiOutlineMessage size={24} /></Link>
                           </div>
                        )}
                     </div>
                     <div className="profile-novel-more">
                        <div className="profile-novel-author">
                           <FaFeatherAlt color={'#c3aeca'} size={15} className="max-sm:hidden" />
                           <FaFeatherAlt color={'#c3aeca'} size={12} className="sm:hidden" />
                           <p className="profile-novel-name">by {selectedNovel?.author}</p>
                        </div>
                        <p className="profile-novel-date">{format(selectedNovel?.createdAt)}</p>
                     </div>
                  </div>
               </div>
               {/* Main Text */}
               <div className="p-2 rounded-xl lg:mx-auto 2xl:w-[80%] xl:w-[85%] lg:w-[90%] md:h-[640px] h-[450px] min-h-full overflow-y-scroll overflow-x-hidden border-b-2 border-t-2">
                  <div className="text-black xl:ml-20 lg:ml-12 lg:text-lg md:text-base text-[11px] md:leading-7 leading-5 md:mb-6 mb-4 xl:pr-16 pr-2 md:pt-2 pt-1"
                     style={{ height: '400px', scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}>
                        {currentPage === 1 && selectedNovel?.quote && (
                           <div className="novel-id-quote">{selectedNovel.quote}</div>
                        )}
                        <div className="flex flex-col md:pl-0 pl-6 h-full prose lg:prose-xl " ref={innerContainerRef}>
                           {lines && lines.map((line: string, index: number) => (
                              <div key={index} id={`line-${index}`} className="text-left md:mb-2 mb-1">
                                 <SanitizedText paragraph={line} />
                              </div>
                           ))}
                        </div>
                  </div>
               </div>
               {/* Dark Mode */}
               <div className="py-2">
                  <ContentModal visible={isOpen} onClose={closeModal} pagination={{ totalPages: totalPagesForModal, currentPage, onPageChange: handlePageChange }} />
                  <div onClick={() => openModal(selectedNovel?.id)} className="2xl:mr-32 xl:mr-24 lg:mr-16 flex justify-end items-center gap-1 group/item md:w-40 w-24 text-gray-400 transition cursor-pointer ml-auto">
                      <p className="md:text-lg text-[10px] uppercase group-hover/item:text-primary-black">Dark mode</p>
                      <MdFitScreen size={20} className="text-gray-400 group-hover/item:text-primary-black max-sm:hidden"/>
                      <MdFitScreen size={15} className="text-gray-400 group-hover/item:text-primary-black sm:hidden"/>
                  </div>
                  {totalPages > 1 && (<Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />)}
               </div>
            </>
         ) : (isLoading) ? (
            <LoaderLine />
         ) : (selectedNovel !== novelId) ? (
            <p className="profile-novel-not-found">Novel not found</p>
         ) : (!selectedNovel) ? (
            <NoItem variation={'ns'} linkHref="/" title="No Selected Novel" description="Click on any novel to select and read it." imageSrc="/images/book.png" imageAlt="No Content Yet" />
         ) : (
            null
         )}
      </div>
  )
}

export default Content