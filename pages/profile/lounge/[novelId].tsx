import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import { NotFound, LoaderLight, Button } from '@/components'
import { WORDS_PER_PAGE } from '@/constants'
import useNovel from '@/hooks/useNovel'

const LoungeId = () => {
   const router = useRouter();
   const { novelId, page } = router.query;
   const { data, isLoading, error } = useNovel(novelId as string);

   const currentPage = parseInt(page as string, 10) || 1;
   const startIndex = (currentPage - 1) * WORDS_PER_PAGE;
   const endIndex = startIndex + WORDS_PER_PAGE;
   
   const contentArray = data?.content || [];
   const currentPageContent = contentArray.slice(startIndex, endIndex);

   useEffect(() => {
      if (!isNaN(currentPage) && (currentPage < 1 || isNaN(startIndex) || startIndex >= data?.content.length)) {
        router.push(`/profile/lounge/${novelId}`);
      }
   }, [currentPage, startIndex, novelId, data, router]);

   if (error) { return <NotFound/> }
   if (isLoading) { return <LoaderLight /> } 

  return (
    <div className="container mx-auto p-4">
      {/* Content */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
        {currentPageContent.length > 0 ? (
          <div className="prose lg:prose-xl">
            {currentPageContent}
          </div>
        ) : (
          <p className="text-center font-bold">No content available for the current page.</p>
        )}
      </div>
      {/* Pagination */}
      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-evenly items-center bg-primary-lighter">   
          <Button title="Previous Page" btnType="button" isDisabled={currentPage === 1} action={() => router.push(`/profile/lounge/${novelId}?page=${currentPage - 1}`)} additionalStyles="button-pagination" leftIcon={<IoMdArrowRoundBack size={22} />} />
          <span className="text-gray-600">Page {currentPage} of {Math.ceil(data?.content.length / WORDS_PER_PAGE)}</span>
          <Button title="Next Page" btnType="button" isDisabled={endIndex >= data?.content.length} action={() => router.push(`/profile/lounge/${novelId}?page=${currentPage + 1}`)} additionalStyles="button-pagination" rightIcon={<IoMdArrowRoundForward size={22} />} />
      </div>
    </div>
  )
}

export default LoungeId