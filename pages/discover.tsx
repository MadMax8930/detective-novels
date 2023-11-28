import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthorData } from '@/types'
import { FiArrowLeft, FiLinkedin } from 'react-icons/fi'
import { Loader } from '@/components'

const Discover: React.FC = () => {
   const router = useRouter();
   const [authorData, setAuthorData] = useState<AuthorData | null>(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND || "http://localhost:3000"}/api/author`)
         .then(response => response.json())
         .then(data => {
            setAuthorData(data);
            setIsLoading(false);
         })
         .catch(error => {
            console.error('Error fetching author data:', error);
            setIsLoading(false);
         });
   }, []);

   return (
      <div className="bg-white-main min-h-screen flex justify-center items-center">
         {isLoading ? <Loader/> : (
            <>
              <div className="bg-primary-blue-100 w-full max-w-screen-2xl h-full shadow-lg overflow-hidden">
                 <div className="flex flex-col md:flex-row">
                     <div className="md:w-1/3 bg-black-100 p-8">
                        <img
                           src={authorData?.picture}
                           alt={authorData?.authorName}
                           className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                     </div>
                     <div className="md:w-2/3 p-8 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                           <FiArrowLeft className="cursor-pointer" size={24} onClick={() => { router.push('/auth') }} />
                           <a href='https://www.linkedin.com/in/vladislav-surnin-89a51b5' target="_blank" rel="noopener noreferrer">
                              <FiLinkedin className="cursor-pointer" size={24} />
                           </a>
                        </div>
                        <h2 className="text-3xl font-semibold mb-4">{authorData?.authorName}</h2>
                        <p className="text-base text-gray-700 mb-4">{authorData?.biography}</p>
                        <div className="p-4 bg-gray-100 rounded-lg mt-4">
                           <p className="text-sm text-gray-600 mb-2">Favorite Books:</p>
                           <ul className="list-disc pl-6">
                              {authorData?.favoriteBooks.map((book, index) => (
                                 <li key={index}>{book}</li>
                              ))}
                           </ul>
                           <p className="mt-2 text-sm text-gray-600">Status: {authorData?.status}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   )
}

export default Discover