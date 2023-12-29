import Link from 'next/link'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { AiOutlineRead, AiOutlineMessage, AiOutlineClose } from 'react-icons/ai'
import { SanitizedText, Pagination } from '@/components'
import { WORDS_PER_PAGE } from '@/constants'
import { ContentModalProps } from '@/types'
import useInfoModal from '@/hooks/useInfoModal'
import useNovel from '@/hooks/useNovel'

const ContentModal: React.FC<ContentModalProps> = ({ visible, onClose, pagination }) => {
   const [isVisible, setIsVisible] = useState(!!visible);
   const [currentPage, setCurrentPage] = useState(1);
   const prevPage = useRef(1);

   const { novelId } = useInfoModal();
   const { data = {} } = useNovel(novelId);

   useEffect(() => {
      setIsVisible(!!visible);
   }, [visible]);

   useEffect(() => {
      const modalContent = document.getElementById("modal-content");
      if (modalContent) {
         if (currentPage > prevPage.current) {
            modalContent.scrollTop = 0;
         } else if (currentPage < prevPage.current) {
            modalContent.scrollTop = modalContent.scrollHeight;
         }
      }
      prevPage.current = currentPage;
   }, [currentPage]);

   const handleClose = useCallback(() => {
      setIsVisible(false);
      setTimeout(() => { onClose() }, 300);
   }, [onClose]);

   const handlePageChange = (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, pagination.totalPages)));
   };

   const paginationProps = {
      totalPages: pagination.totalPages,
      currentPage,
      onPageChange: handlePageChange,
   };

   let startIndex = (currentPage - 1) * WORDS_PER_PAGE;
   let endIndex = startIndex + WORDS_PER_PAGE;
   while (endIndex < data?.content?.length && !/\s|\p{P}/u.test(data.content[endIndex])) {
      endIndex++;
   }

   const currentPageContent = (data?.content || '').substring(startIndex, endIndex);

   if (!visible) return null;
   
   return (
      <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-auto fixed inset-0">
         <div className="relative w-full mx-auto max-w-screen-xl rounded-md overflow-hidden">
            <div className={`${isVisible ? 'scale-100' : 'scale-0'} pl-2 pt-2 md:pl-4 md:pt-4 transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
               <div className="relative w-full max-h-[80vh] mt-4 ml-1 md:ml-2 mb:pb-0 pb-4 pt-4 md:mb-0 mb-4">
                   <div className="cursor-pointer absolute md:top-3 top-5 xl:right-[13%] lg:right-[13.25%] right-[10%] h-8 w-8 md:h-10 md:w-10 rounded-full bg-black hover:bg-btn-comment bg-opacity-70 flex items-center justify-center" 
                        onClick={handleClose}>
                        <AiOutlineClose className="text-white max-sm:hidden" size={20} />
                        <AiOutlineClose className="text-white sm:hidden" size={16} />
                   </div>
                   <div className="absolute md:top-[20%] top[10%] xl:left-[14%] md:left-[15%] left-[10%] text-white md:mt-3 mt-1 flex items-center gap-3">
                     <p className="text-white text-xl md:text-2l lg:text-3xl h-full font-bold">{data?.title}</p>
                     <div className="flex items-center gap-1 text-primary-light">
                        <Link href={`/profile/lounge/${novelId}`} title="Read Mode" className="hover:text-grey"><AiOutlineRead size={28} /></Link>
                        <Link href={`/profile/blog/${novelId}`} title="Leave Comment" className="hover:text-grey"><AiOutlineMessage size={22} /></Link>
                     </div>
                   </div>
               </div>
               <div className="lg:px-12 py-6 md:py-10 lg:py-20 flex flex-col md:h-[90vh] h-[95vh]">
                  {currentPageContent.length > 0 && (
                     <div id="modal-content" className="prose lg:prose-xl border-b mx-auto text-white-main md:text-lg sm:text-base text-[14px] text-left overflow-y-scroll 3xl:w-full w-4/5 md:px-6 px-2 overflow-x-hidden flex-grow mb-4 md:mb-8" style={{ whiteSpace: 'pre-line' }}>
                        {currentPage === 1 && data?.quote && (<div className="novel-id-quote text-primary-light text-right pr-8">{data.quote}</div>)}
                        <SanitizedText paragraph={currentPageContent} />
                     </div>
                  )}
                  {pagination.totalPages > 1 && (
                     <div className="flex justify-center">
                        <Pagination {...paginationProps} />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContentModal