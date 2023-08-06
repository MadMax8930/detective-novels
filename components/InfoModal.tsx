import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import useInfoModal from '@/hooks/useInfoModal'
import useNovel from '@/hooks/useNovel'

interface InfoModalProps {
   visible?: boolean;
   onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
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
      <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
         <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
            <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md mt-2`}>
               <div className="relative h-96 min-w-[640px] w-full">
                   <img src={data?.coverImage} alt="Thumbnail Cover" className="w-full brightness-[55%] object-cover h-full" />
                   <div className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center" 
                        onClick={handleClose}>
                        <AiOutlineClose className="text-white" size={20} />
                   </div>
                   <div className="absolute top-[5%] left-10">
                     <p className="text-green-400 font-semibold text-md capitalize">{data?.author}</p>
                   </div>
                   <div className="absolute bottom-[10%] left-10">
                     <p className="text-white text-2xl md:text-3xl lg:text-5xl h-full font-bold mb-8">{data?.title}</p>
                   </div>
               </div>
               <div className="px-12 pt-6 pb-8">
                  <p className="text-white text-md">{data?.description}</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default InfoModal