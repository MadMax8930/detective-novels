import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { AuthorDataProps } from '@/types'
import { FiArrowLeft, FiLinkedin } from 'react-icons/fi'
// import { SlSocialVkontakte } from 'react-icons/sl'
import { LINKEDIN } from '@/constants'
import { LoaderDark } from '@/components'
import withLoading from '@/pages/_hoc'

const authorEndpoint = `${process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3000'}/api/author`;

export const getServerSideProps: GetServerSideProps = async () => {
   try {
     const response = await fetch(authorEndpoint);
     const authorData = await response.json();
     return {
       props: { authorData },
     };
   } catch (error) {
     console.error('Error fetching author data:', error);
     return {
       props: { authorData: null },
     };
   }
};

const Discover: React.FC<{ authorData: AuthorDataProps }> = ({ authorData }) => {
   const router = useRouter();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (authorData !== null) { setLoading(false) }
   }, [authorData]);

   if (loading) { return <LoaderDark /> }
   if (!authorData) { router.push('/auth'); return null }

   return (
      <div className="min-h-screen flex justify-center items-center">
         <div className="bg-primary-lighter w-full max-w-screen-2xl h-full shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
               <div className="md:w-1/3 bg-primary-black relative">
                  <Image src={authorData.picture} alt={authorData.authorName} fill={true} className="w-full h-full rounded-lg shadow-md object-cover p-8 filter grayscale" />
               </div>
               <div className="md:w-2/3 p-8 overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                     <FiArrowLeft className="cursor-pointer" size={24} onClick={() => { router.push('/auth') }} />
                     <Link href={LINKEDIN} passHref target="_blank" rel="noopener noreferrer">
                        <FiLinkedin className="cursor-pointer" size={24} />
                     </Link>
                  </div>
                  <h2 className="text-3xl font-semibold mb-4">{authorData.authorName}</h2>
                  <p className="text-base text-gray-700 mb-4">{authorData.biography}</p>
                  <div className="bg-primary-lighter rounded-lg p-4 mt-4">
                     <p className="text-sm text-gray-600 mb-2">Uploaded Novels:</p>
                     <ul className="list-disc pl-6">
                        {authorData.favoriteBooks.map((book, index) => (
                           <li key={index}>{book}</li>
                        ))}
                     </ul>
                     <p className="mt-2 text-sm text-gray-600">Status: {authorData.status}</p>
                     <div className="md:hidden bg-primary-black relative h-[600px] mt-6">
                        <Image src={authorData.picture} alt={authorData.authorName} fill={true} className="w-full h-full rounded-lg shadow-md object-cover p-8 filter grayscale" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default withLoading(Discover)