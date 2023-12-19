import React from 'react'
import useNovel from '@/hooks/useNovel'
import { useRouter } from 'next/router'

const LoungeId = () => {
   const router = useRouter();
   const { novelId } = router.query;
   const { data, isLoading, error } = useNovel(novelId as string);

   if (!novelId || error) { return null }

  return (
    <div className='pt-32 text-center'>LoungeId Page: {novelId} / { data?.title}</div>
  )
}

export default LoungeId