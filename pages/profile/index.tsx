import React, { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { BiLogOut } from 'react-icons/bi'
import { FaDonate } from 'react-icons/fa'
import { Loader, Carousel, Content, SearchBar, Donations } from '@/components'
import { getUserSessionServerSideProps } from '@/lib/sessionProps'
import { SessionUserProps } from '@/types'
import useNovelList from '@/hooks/useNovelList'
import useNovel from '@/hooks/useNovel'

import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'
import { metadata } from '@/pages/_app'
import ProfileLayout from './_layout'
import { metadataProfile } from './_layout'
import RootLayout from '../_layout'
import { ProfileProps } from '@/types'
 
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
      <div className="w-screen min-h-full bg-white-main">
         {/* Top Navigation */}
         {(isLoading || !novels) ? <Loader /> : (<>
         {/* <div className="fixed w-full px-4 md:px-24 md:pr-14 pr-12 z-30 flex flex-col justify-between gap-4 md:gap-8 bg-black bg-opacity-80">
            <nav className="flex flex-row justify-between pb-4 md:pb-1 px-2 md:px-5">
               <div className="flex items-center justify-center px-7 pt-5 md:pt-4 gap-1 md:gap-2 cursor-pointer" onClick={() => signOut()}>
                  <BiLogOut size={32} className="text-white sm:hidden" />
                  <BiLogOut size={30} className="text-white max-sm:hidden" />
                  <span className="text-white text-base md:text-xl font-semibold">Logout 
                     <span className="hidden lg:inline">{" "} as {" "}<strong className="text-gray-400 capitalize">{session.username}</strong></span>
                  </span>
               </div>
               <div className="flex flex-row justify-center px-0 lg:px-12 mt-4 md:mt-9 gap-1 md:gap-2">
                  <Donations />  
                  <FaDonate size={28} className="text-white hidden lg:inline" />
               </div>
            </nav>
         </div> */}
         {/* Main Content */}
         <div className="flex-grow overflow-hidden">
            <Carousel novels={novels} adminPage={false} />
            <SearchBar initialValue={novelData?.title} />
            <Content linesPerPage={linesPerPage} />
         </div>
        </>)}
      </div>
   )
};

Profile.getLayout = function getLayout(page: ReactElement, props: ProfileProps) {
   const { session } = props;
   return (
      <RootLayout metadata={metadata}>
         <ProfileLayout layoutMetadata={metadataProfile || metadata} session={props.session}>{page}</ProfileLayout>
      </RootLayout>
   )
}

export default Profile