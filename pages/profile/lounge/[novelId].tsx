import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { IoMdArrowRoundBack, IoMdArrowRoundForward, IoIosExit } from 'react-icons/io'
import { NotFound, LoaderLight, Button, NoItem } from '@/components'
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
   const paragraphs = typeof currentPageContent === 'string' ? currentPageContent.split('\n') : [currentPageContent];

   useEffect(() => {
      if (!isNaN(currentPage) && (currentPage < 1 || isNaN(startIndex) || startIndex >= data?.content.length)) {
        router.push(`/profile/lounge/${novelId}`);
      }
   }, [currentPage, startIndex, novelId, data, router]);

   if (error) { return <NotFound/> }
   if (isLoading) { return <LoaderLight /> }
   
  return (
    <div className="bg-primary-light">
      <div className="novel-id-container">
         <div className="novel-id-content">
            <div className="novel-id-header">
               <Button title="Lounge" btnType="button" action={() => router.push(`/profile/lounge`)} additionalStyles='button-lounge' leftIcon={<IoIosExit size={23} />} />
               <div className="novel-id-title">{data?.title || 'N/A'}</div>
            </div>
            {currentPage === 1 && data?.quote && (
               <div className="novel-id-quote">{data.quote}</div>
            )}
            {paragraphs.length > 0 ?
               <div className="prose lg:prose-xl mt-2">
                  {paragraphs.map((paragraph, index) => (
                     <p key={index}>{paragraph}</p>
                  ))}
               </div> :
               <div className="novel-id-no-container">
                  <p className="novel-id-no-content">No content available for the current page.</p>
                  <NoItem variation={'nn'} linkHref="/profile/lounge" title="No Novel Content" description="The selected novel has no content yet." imageSrc="/images/nonovel.png" imageAlt="No Novel Id" />
               </div>}
         </div>
         <div className="novel-id-pagination">   
            <Button title="Previous Page" btnType="button" isDisabled={currentPage === 1} action={() => router.push(`/profile/lounge/${novelId}?page=${currentPage - 1}`)} additionalStyles="button-pagination" leftIcon={<IoMdArrowRoundBack size={23} />} />
            <span className="text-gray-600">Page {currentPage} of {Math.ceil(data?.content.length / WORDS_PER_PAGE)}</span>
            <Button title="Next Page" btnType="button" isDisabled={endIndex >= data?.content.length} action={() => router.push(`/profile/lounge/${novelId}?page=${currentPage + 1}`)} additionalStyles="button-pagination" rightIcon={<IoMdArrowRoundForward size={23} />} />
         </div>
      </div>
    </div>
  )
}

export default LoungeId