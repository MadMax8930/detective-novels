import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Carousel, Content, SearchBar, DonateContainer, LoaderLight } from '@/components'
import { getUserSessionServerSideProps } from '@/lib/sessionProps'
import useNovelList from '@/hooks/useNovelList'
import useNovel from '@/hooks/useNovel'

import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'
import { ProfileProps } from '@/types'
import { metadata } from '@/pages/_app'
import ProfileLayout, { metadataProfile } from './_layout'
import RootLayout from '../_layout'
 
// Protecting routes by fetching user session on client side
export const getServerSideProps = getUserSessionServerSideProps;

const Profile: NextPageWithLayout<ProfileProps> = ({ session }) => {
   const router = useRouter();
   const novelId = router.query.novel as string;
   const { data: novels = [], isLoading } = useNovelList();
   const { data: novelData = [] } = useNovel(novelId);

   const [linesPerPage, setLinesPerPage] = useState<number>(0);
   useEffect(() => {
      const novelContentLength = novelData?.content?.length || 0;
      const minLinesPerPage = 10;
      const calculatedLinesPerPage = Math.max(
         Math.ceil(novelContentLength / window.innerHeight * 0.035),
         minLinesPerPage
      );
      setLinesPerPage(calculatedLinesPerPage);
   }, [novelData]);

   return (
      <div className="w-screen min-h-full">
         {(isLoading || !novels) ? <LoaderLight /> : (<>
         <div className="flex-grow overflow-hidden">
            <DonateContainer session={session} />
            <Carousel novels={novels} adminPage={false} />
            <SearchBar initialValue={novelData?.title} />
            <Content linesPerPage={linesPerPage} />
         </div>
        </>)}
      </div>
   )
};

Profile.getLayout = function getLayout(page: ReactElement, props: ProfileProps) {
   return (
      <RootLayout metadata={metadata}>
         <ProfileLayout layoutMetadata={metadataProfile || metadata} session={props.session}>{page}</ProfileLayout>
      </RootLayout>
   )
}

export default Profile