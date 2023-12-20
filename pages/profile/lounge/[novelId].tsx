import React, { useEffect } from 'react'
import useNovel from '@/hooks/useNovel'
import { useRouter } from 'next/router'

const LoungeId = () => {
   const router = useRouter();
   const { novelId, page } = router.query;
   const { data, isLoading, error } = useNovel(novelId as string);

   const currentPage = parseInt(page as string, 10) || 1;
   const itemsPerPage = 2000;
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   
   const currentPageContent = data?.content?.slice(startIndex, endIndex);

   useEffect(() => {
      // Redirect to a valid page if the current page is out of bounds
      if (!isNaN(currentPage) && (currentPage < 1 || isNaN(startIndex) || startIndex >= data?.content.length)) {
        router.push(`/profile/lounge/${novelId}`);
      }
   }, [currentPage, startIndex, novelId, data, router]);

   if (!novelId || error) { return null }

  return (
    <>
      <div className='pt-32 text-center'>LoungeId Page: {novelId} / { data?.title}</div>
      <div>
         {currentPageContent}
      </div>
    </>
  )
}

export default LoungeId