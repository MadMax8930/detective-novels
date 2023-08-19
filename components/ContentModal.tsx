import React, { useCallback, useEffect, useState } from 'react'
import { ContentModalProps } from '@/types'
import useInfoModal from '@/hooks/useInfoModal'
import useNovel from '@/hooks/useNovel'
import { AiOutlineClose } from 'react-icons/ai'
import { Pagination } from '@/components'

const ContentModal: React.FC<ContentModalProps> = ({ visible, onClose, pagination  }) => {
   const [isVisible, setIsVisible] = useState(!!visible);

   const { novelId } = useInfoModal();
   const { data = {} } = useNovel(novelId);

   useEffect(() => {
      setIsVisible(!!visible);
   }, [visible]);

   const handleClose = useCallback(() => {
      setIsVisible(false);
      setTimeout(() => { onClose() }, 300);
   }, [onClose]);

   if (!visible) return null;
   
   return (
      <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-auto fixed inset-0">
         <div className="relative w-full mx-auto max-w-screen-lg rounded-md overflow-hidden">
            <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
               <div className="relative w-full h-full">
                   <div className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center" 
                        onClick={handleClose}>
                        <AiOutlineClose className="text-white" size={20} />
                   </div>
                   <div className="absolute bottom-[10%] left-10 text-white">
                     <p className="text-white text-2xl md:text-3xl lg:text-5xl h-full font-bold mb-8">{data?.title}</p>
                   </div>
               </div>
               <div className="px-10 md:px-20 py-12 md:py-24">
                  <p className="text-white text-md text-justify overflow-auto overflow-x-hidden max-h-[60vh]">{data?.content}</p>
                  {pagination && (
                     <div className="flex justify-center mt-8">
                        <Pagination {...pagination} />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContentModal