import React from 'react'
import { useRouter } from 'next/router'
import { NotFound, LoaderLight } from '@/components'
import useNovel from '@/hooks/useNovel'

const BlogId = () => {
   const router = useRouter();
   const { novelId } = router.query;
   const { data, isLoading, error } = useNovel(novelId as string);

   if (error) { return <NotFound/> }
   if (isLoading) { return <LoaderLight /> } 

  return (
    <div className='pt-32 text-center'>BlogId Page: {novelId} / { data?.title}</div>
  )
}

export default BlogId