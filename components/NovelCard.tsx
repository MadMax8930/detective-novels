import React from 'react'
import { useRouter } from 'next/router'
import LinesEllipsis from 'react-lines-ellipsis'
import useInfoModal from '@/hooks/useInfoModal'
import { PiBookBookmarkDuotone } from 'react-icons/pi'
import { BiChevronDown } from 'react-icons/bi'

interface NovelCardProps {
   data: Record<string, any>;
}

const NovelCard: React.FC<NovelCardProps> = ({ data }) => {
   const router = useRouter();
   const { openModal } = useInfoModal();

   return (
      <div className="group bg-black-100 col-span relative h-[16.4vw] border-primary-blue-100 border-4">
         {/* Novel Card */}
         <img src={data.coverImage} alt="Novel Cover"
              className="cursor-pointer object-cover transition duration delay-300 shadow-xl roup-hover:opacity-90 sm:group-hover:opacity-0 w-full h-[16vw]" />
         {/* Hover Card */}
         <div className="opacity-0 w-full scale-0 absolute top-0 z-10 transition duration-200 delay-300 invisible sm:visible
                         group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
            <img src={data.coverImage} alt="Novel Cover on Hover" 
                 className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[16vw]" />

            <div className="bg-zinc-800 w-full absolute z-10 p-2 lg:p-4 transition shadow-md rounded-b-md">
         
               <div className="flex flex-row justify-between">
                  <div className="flex flex-row mt-1 gap-2 justify-center items-center">
                     <p className="text-green-400 font-semibold text-[12px] lg:text-sm">{data.title}</p>
                  </div>
                  <div className="flex flex-row items-center gap-1.5">
                     <div className="cursor-pointer rounded-full w-5 h-5 lg:w-8 lg:h-8 flex justify-center items-center bg-white hover:bg-neutral-300 transition"
                        onClick={() => router.push(`/read/${data?.id}`)}>
                        <PiBookBookmarkDuotone size={25} />
                     </div>
                     <div className="cursor-pointer ml-auto group/item w-5 h-5 lg:w-8 lg:h-8 flex justify-center items-center rounded-full border-white border-2 hover:border-neutral-300 transition"
                        onClick={() => openModal(data?.id)}>
                        <BiChevronDown size={25} className="text-white group-hover/item:text-neutral-300"/>
                     </div>
                  </div>
               </div>

               <div className="flex flex-row mt-4 gap-2 items-center">
                  <LinesEllipsis text={data.description} maxLine="3" ellipsis="..." className="text-white text-[8px] lg:text-sm italic" />
               </div>
               <div className="flex flex-row mt-4 gap-2 items-center">
                  <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
               </div>
            </div>

         </div>
      </div>
   )
}

export default NovelCard