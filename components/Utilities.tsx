import React from 'react'
import Image from 'next/image'
import { ClipLoader, BarLoader, ClockLoader, MoonLoader } from 'react-spinners'

const LoaderLight = () => {
   return (
      <div className="flex justify-center items-center h-full min-h-screen">
         <ClockLoader color="red" size={22} />
         <div className='opacity-20 absolute inset-0'>
            <Image src="/images/nature.gif" alt="Gif" fill={true} className='object-cover' priority={true} />
         </div>
      </div>
   )
}

const LoaderDark = () => {
   return (
      <div className="flex justify-center items-center h-full min-h-screen bg-black">
         <ClockLoader color="red" size={22} />
         <div className='opacity-10 absolute inset-0'>
            <Image src="/images/nature.gif" alt="Gif" fill={true} className='object-cover' priority={true} />
         </div>
      </div>
   )
}

const LoaderLine = () => {
   return (
      <div className="flex justify-center items-center h-full min-h-[220px] relative">
         <BarLoader color="red" height={5} width={125} />
      </div>
   )
}

const LoaderRound = () => {
   return (
      <div className="min-h-[540px] flex flex-grow justify-center items-center">
         <MoonLoader color="grey" size={90} />
      </div>
   )
}

const LoaderAdmin = () => {
   return (
      <div className="min-h-[460px] flex flex-grow justify-center items-center">
         <ClipLoader color="#5d57c9" size={40} />
      </div>
   )
}

const ErrorAdmin = () => {
   return (
      <div className="min-h-[20px]">
         <p className="text-center text-white">Error loading admin data.</p>
      </div>
   )
}

export { LoaderLight, LoaderDark, LoaderLine, LoaderRound, LoaderAdmin, ErrorAdmin }