import React from 'react';
import { useRouter } from 'next/router';

const Notfound = () => {
   const router = useRouter();

  return (
   <div className="relative h-screen bg-[url('/images/notfound.jpg')] bg-no-repeat bg-fixed bg-center bg-cover">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="sm:text-lg text-base mb-4">404 &nbsp; | &nbsp; This page could not be found</h1>
          <p className="sm:text-lg text-base">
            <span className="tracking-wide">Go back to {" "}</span>
            <span className="font-semibold hover:text-red-500 cursor-pointer" onClick={() => router.push('/')}>Homepage</span>
          </p>
        </div>
      </div>
   </div>
  )
}

export default Notfound