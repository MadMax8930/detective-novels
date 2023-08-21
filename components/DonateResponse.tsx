import React from 'react'
import { DonateResponseProps } from '@/types'
import { FcProcess } from 'react-icons/fc'
import { FaHeart } from 'react-icons/fa'

const DonateResponse: React.FC<DonateResponseProps>= ({ status, loading }) => {
   return (
     <div className="flex justify-center items-center min-h-screen bg-white-main relative">
       <div className="text-center md:w-2/3 lg:w-1/2 xl:w-1/3 p-4 md:p-8 bg-white rounded-lg shadow-md relative z-10">
         <div className="flex flex-col items-center">
           {loading && (
             <>
               <div className="text-3xl md:text-4xl lg:text-5xl mb-4"><FcProcess /></div>
               <h1 className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 font-semibold text-blue-800">Processing...</h1>
             </>
           )}
           {!loading && (
             <>
               <div className="text-3xl md:text-4xl lg:text-5xl text-red-500 mb-4"><FaHeart /></div>
               <h1 className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 font-semibold text-blue-800">{status}</h1>
               <p className="text-base md:text-lg lg:text-xl text-gray-700">
                  Your support means the world! By contributing, you are helping me bring more captivating novels
                  and stories to life.
               </p>
             </>
           )}
         </div>
       </div>
       <div className="absolute inset-0 backdrop-blur-md"></div>
     </div>
   );
};

export default DonateResponse
