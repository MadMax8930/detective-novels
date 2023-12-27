import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LinesEllipsis from 'react-lines-ellipsis'
import { BiBookContent, BiChevronDown } from 'react-icons/bi'
import useInfoModal from '@/hooks/useInfoModal'

interface NovelCardProps {
   data: Record<string, any>;
}

const NovelCard: React.FC<NovelCardProps> = ({ data }) => {
   const router = useRouter();
   const { openModal } = useInfoModal();
   const biggerScreens = window.innerWidth >= 644;

   return (
      <div className="group bg-primary-black col-span relative h-full border-primary-blue-100 border-4 outline-double">
         {/* Novel Card */}
         <img src={data.coverImage} alt="Novel Cover"
              className="cursor-pointer object-cover transition duration delay-300 shadow-xl group-hover:opacity-90 sm:group-hover:opacity-0 w-full h-full" />
              <div className="novel-card-new">NEW</div>
         {/* Hover Card */}
         <div className={`opacity-0 w-full scale-0 absolute top-0 z-10 transition duration-200 delay-300 
                        ${biggerScreens ? 'invisible sm:visible' : 'visible'}
                         group-hover:scale-110 group-hover:translate-x-0 group-hover:opacity-100 
                         ${biggerScreens ? 'group-hover:-translate-y-[2vw]' : 'group-hover:-translate-y-0'}`}>
            <Link href={`/profile/lounge/${data?.id}`}>
                  <img src={data.coverImage} alt="Novel Cover on Hover" 
                        className={`cursor-pointer object-cover transition duration shadow-xl w-full h-full
                             ${biggerScreens ? 'max-h-[17.5vw] min-h-[250px] rounded-t-md' : 'relative rounded-md'}`} />
            </Link>
            <div className={`bg-zinc-800 w-full absolute z-10 p-2 lg:p-4 transition shadow-md rounded-b-md
                           ${biggerScreens ? 'max-h-42 h-auto' : 'min-h-16 max-h-24 absolute bottom-0'}`}>
               {/* Title */}
               <h2 className="text-green-400 font-semibold font-unbounded md:text-[11.5px] text-[10px]">{data.title}</h2>
               {/* Description */}
               <div className="flex mt-2 items-center">
                  <LinesEllipsis text={data.description} maxLine="1" ellipsis="..." className="text-white text-[0.5rem] lg:text-xs italic" />
               </div>
               {/* Genre & Buttons */}
               <div className="flex justify-between items-end gap-2 mt-2 mb-1">
                  <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
                  <div className="flex flex-row items-center gap-1">
                     <div className="cursor-pointer rounded-full w-6 h-6 lg:w-8 lg:h-8 flex justify-center items-center bg-white hover:bg-neutral-300 transition"
                        onClick={() => router.push(`/preview/${data?.id}`)}>
                        <BiBookContent size={14} className="sm:hidden" />
                        <BiBookContent size={18} className="max-sm:hidden" />
                     </div>
                     <div className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-8 lg:h-8 flex justify-center items-center rounded-full border-white border-2 hover:border-neutral-300 transition"
                        onClick={() => openModal(data?.id)}>
                        <BiChevronDown size={25} className="text-white group-hover/item:text-neutral-300"/>
                     </div>
                  </div>
               </div>

            </div>

         </div>
      </div>
   )
}

export default NovelCard