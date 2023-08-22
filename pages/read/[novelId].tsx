import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useNovel from '@/hooks/useNovel'
import { BsArrowLeftSquareFill, BsPersonSquare } from 'react-icons/bs'
import { Loader, Footer } from '@/components'

const Read = () => {
   const router = useRouter();
   const { novelId } = router.query;
   const { data, isLoading, error } = useNovel(novelId as string);

   if (!novelId || error) { return null }

   return (
      <div className="w-screen bg-[#161616]">
         {/* Top Navigation */}
         <div className="fixed w-full px-6 md:px-24 z-10 flex flex-col justify-between gap-1 bg-black bg-opacity-80">
            <nav className="flex flex-row justify-between pb-4 md:pb-10">
               <div className="flex flex-row justify-center md:px-12 pt-4 md:pt-9 gap-2 cursor-pointer" onClick={() => router.push('/')}>
                  <BsArrowLeftSquareFill size={28} onClick={() => router.push('/')} className="text-white cursor-pointer max-sm:hidden" />
                  <BsArrowLeftSquareFill size={21} onClick={() => router.push('/')} className="text-white cursor-pointer sm:hidden" />
                  <span className="text-white text-[14px] md:text-xl font-semibold">Novel Preview:{" "}</span>          
               </div>
               <div className="flex md:px-7 pt-4 md:pt-9 gap-2 cursor-pointer" onClick={() => router.push('/auth')}>
                  <span className="text-white text-[14px] md:text-xl font-semibold">Read the rest</span>
                  <BsPersonSquare size={21} className="text-white sm:hidden" />
                  <BsPersonSquare size={28} className="text-white max-sm:hidden" />
               </div>
            </nav>
         </div>
         {/* Preview */}
         {(isLoading || !data) ? <Loader/> : (
         <div className="md:pt-32 pt-20 px-6 md:px-36 text-justify">
            <p className="text-green-400 text-2xl md:text-3xl font-bold">{data?.title}</p><br /> 
            <div className="text-white text-xs md:text-base font-serif">
               {data?.preview}...
            </div>
            <div className="h-[50px] text-center pt-12 pb-16">
               <p className="text-white text-[14px] md:text-xl uppercase">To Read the rest of this novel,<br className="sm:hidden"/>
               <Link href={{ pathname: '/auth', query: { variant: 'register' } }}><span className="text-red-500">Create</span></Link> or {" "}
               <Link href={{ pathname: '/auth', query: { variant: 'login' } }}><span className="text-red-500">login</span></Link> to your account. <br/> It takes 10 seconds and it is 100% free!</p>
            </div>
         </div>)}
         {/* Footer */}
         <div className="flex items-center justify-center">
            <div className="container h-full mx-auto xl:px-30 max-w-7xl pt-6">
               <Footer bgLight={false} />
            </div>
         </div>
      </div>
   )
}

export default Read