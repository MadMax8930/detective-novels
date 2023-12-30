import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineRead, AiOutlineMessage, AiOutlineClose } from 'react-icons/ai'
import useInfoModal from '@/hooks/useInfoModal'
import useNovel from '@/hooks/useNovel'
import { InfoModalProps } from '@/types'
import { format } from '@/lib/dateFormat'

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
   const [isVisible, setIsVisible] = useState(!!visible);
   const [isImageLoaded, setIsImageLoaded] = useState(false);

   const { novelId } = useInfoModal();
   const { data = {} } = useNovel(novelId);

   useEffect(() => {
      setIsVisible(!!visible);
   }, [visible]);

   useEffect(() => {
      const img = new Image();
      img.src = data?.coverImage || '';
   }, [data?.coverImage]);

   useEffect(() => {
      if (data?.coverImage) {
        const img = new Image();
        img.src = data.coverImage;
        img.onload = () => {
          setIsImageLoaded(true);
        };
      }
   }, [data?.coverImage]);

   const handleClose = useCallback(() => {
      setIsVisible(false);
      setTimeout(() => { onClose() }, 300);
   }, [onClose]);

   if (!visible) return null;
   
   return (
      <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
         <div className="relative w-auto mx-4 md:mx-auto max-w-3xl rounded-md overflow-hidden">
            <div className={`${isVisible ? 'scale-100' : 'scale-0'} md:min-h-[220px] min-h-auto md:min-w-[766px] min-w-[310px] transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md mt-2`}>
               <div className="relative md:h-40 h-20 md:min-w-[640px] w-full">
                   {isImageLoaded && <img src={data?.coverImage} alt="Thumbnail Cover" className="w-full brightness-[75%] object-cover h-full opacity-30" />}
                   <div className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center hover:bg-btn-comment" 
                        onClick={handleClose}>
                        <AiOutlineClose className="text-white" size={20} />
                   </div>
                   <Link className="cursor-pointer absolute top-3 right-[60px] h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center hover:bg-btn-comment"
                        href={`/profile/blog/${data?.id}`} title="Comment">
                        <AiOutlineMessage className="text-white" size={20} />
                   </Link>
                   <Link className="cursor-pointer absolute top-3 right-[108px] h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center hover:bg-btn-comment"
                        href={`/profile/lounge/${data?.id}`} title="Read">
                        <AiOutlineRead className="text-white" size={20} />
                   </Link>
                   <div className="absolute bottom-[5%] left-5 md:left-10 flex gap-1.5 md:text-sm text-[10px] text-primary-light">
                     <p className="font-semibold">Posted by:</p>
                     <p className="capitalize">{data?.author} - {format(data.createdAt)}</p>
                   </div>
                   <div className="absolute md:top-[20%] top-0 left-5 md:left-10">
                     <p className="text-white text-xl md:text-3xl lg:text-5xl h-full font-bold md:mb-8 mt-4">{data?.title}</p>
                   </div>
               </div>
               <div className="px-6 md:px-12 pt-6 pb-8">
                  <p className="text-white text-sm md:text-base">{data?.description}</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default InfoModal