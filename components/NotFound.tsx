import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const NotFound = () => {
   const router = useRouter();

  return (
   <div className="relative h-screen">
      <Image src="/images/notfound.jpg" alt="Not Found" fill={true} className='object-cover' />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="sm:text-base text-sm mb-4">404 &nbsp; | &nbsp; This page could not be found</h1>
          <p className="sm:text-base text-sm uppercase font-semibold hover:text-primary-red hover:scale-110 cursor-pointer" onClick={() => router.push('/')}>
            <span className="tracking-wide">Go back to Homepage</span>
          </p>
        </div>
      </div>
   </div>
  )
}

export default NotFound