import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoIosExit } from 'react-icons/io'
import { LoaderDark, Button, Footer, Navbar, NoItem, NotFound, BookAnimation } from '@/components'
import useNovel from '@/hooks/useNovel'
import withLoading from '@/pages/_hoc'

const PreviewId = () => {
   const router = useRouter();
   const { novelId } = router.query;
   const { data, isLoading, error } = useNovel(novelId as string);

   const previewArray = data?.preview || [];
   const paragraphs = typeof previewArray === 'string' ? previewArray.split('\n') : [previewArray];

   if (error) { return <NotFound/> }
   if (isLoading) { return <LoaderDark /> }

  return (
    <div className="bg-primary-black flex flex-col items-center">
      <Navbar/>
      <div className="flex flex-col md:flex-row items-center justify-center mt-10">
         <div className='p-16'><BookAnimation novel={data} isPreviewPage={true} /></div>
         <div className="preview-id-container">
            <div className="preview-id-content">
               <div className="preview-id-header">
                  <Button title="Home" btnType="button" action={() => router.push(`/`)} additionalStyles="button-home" leftIcon={<IoIosExit size={23} />} />
                  <div className="preview-id-title">PREVIEW : {data?.title || 'N/A'}</div>
               </div>
               {paragraphs.length > 0 ?
                  <div className="prose lg:prose-xl mt-2">
                     {paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                     ))}
                     <span className="preview-ellipsis">...</span>
                  </div> :
                  <div className="preview-id-no-container">
                     <p className="preview-id-no-content">No preview available for the current novel.</p>
                     <NoItem variation={'np'} linkHref="/" title="No Novel Preview" description="The selected novel has no preview yet." imageSrc="/images/nonovel.png" imageAlt="No Novel Id" />
                  </div>}
            </div>
            <div className="preview-info">
               <p className="preview-paragraph">To Read the rest of this novel,&nbsp;<br className="sm:hidden"/>
               <Link href={{ pathname: '/auth', query: { variant: 'register' } }}><span className="text-red-500">Create</span></Link> or {" "}
               <Link href={{ pathname: '/auth', query: { variant: 'login' } }}><span className="text-red-500">login</span></Link> to your account. <br/> It takes 10 seconds and it is 100% free.</p>
            </div>
         </div>
      </div>
      <Footer bgLight={false} extraWrapper={true} />
    </div>
   )
}

export default withLoading(PreviewId)