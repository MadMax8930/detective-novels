import React, { useState } from 'react'
import { ContentModal } from '@/components'
import { MdFitScreen } from 'react-icons/md'
import { WORDS_PER_PAGE } from '@/constants'
import useInfoModal from '@/hooks/useInfoModal'
import useNovel from '@/hooks/useNovel'

const DarkMode = ({ novelId }: { novelId: string }) => {
   const { data: selectedNovel } = useNovel(novelId);
   const { isOpen, openModal, closeModal } = useInfoModal();

   const totalPagesForModal = Math.ceil(selectedNovel?.content?.length / WORDS_PER_PAGE);

   const [currentPage, setCurrentPage] = useState(1);
   const handlePageChange = (page: number) => { setCurrentPage(page) };

   return (
      <>
         <ContentModal visible={isOpen} onClose={closeModal} pagination={{ totalPages: totalPagesForModal, currentPage, onPageChange: handlePageChange }} />
         <div onClick={() => openModal(selectedNovel?.id)} className="lg:mx-1 flex justify-start items-center gap-1 group/item w-24 text-grey transition cursor-pointer ml-auto">
            <p className="lg:text-lg md:text-[17px] text-base uppercase group-hover/item:text-primary-black font-shoulders">Dark mode</p>
            <MdFitScreen size={20} className="text-grey group-hover/item:text-primary-black max-sm:hidden"/>
            <MdFitScreen size={15} className="text-grey group-hover/item:text-primary-black sm:hidden"/>
         </div>
      </>
  )
}

export default DarkMode