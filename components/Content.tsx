import React from 'react'
import { useRouter } from 'next/router'
import useNovel from '@/hooks/useNovel'

const Content = () => {
   const router = useRouter();
   const novelId = router.query.novel as string;

   const { data: selectedNovel } = useNovel(novelId);

   return (
      <div className="pt-10 pb-16 px-36 text-justify">
         {selectedNovel ? (
            <>
               <div className="flex flex-row justify-between items-center">
                  <p className="text-black-100 text-1xl md:text-3xl font-bold uppercase">{selectedNovel?.title}</p><br /> 
                  <p className="text-gray-400">{selectedNovel?.createdAt}</p>
               </div>
               <div className="text-black text-base font-serif pt-4">
                  {selectedNovel?.content}
               </div>
            </>
         ) : selectedNovel !== novelId ? (
            <p className="text-red-500 text-xl font-semibold">Novel not found</p>
         ) : (
            null
         )}
      </div>
  )
}

export default Content