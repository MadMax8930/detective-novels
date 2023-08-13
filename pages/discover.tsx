import React, { useState } from 'react'
import { Loader } from '@/components'

const Discover = () => {
   const [isLoading, setIsLoading] = useState(false);

   return (
      <div className="w-screen min-h-full bg-white-main text-black">
         {isLoading ? <Loader/> : (
            <>
               Discover page
            </>
         )}
      </div>
   )
}

export default Discover