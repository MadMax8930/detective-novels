import React, { useState, useEffect } from 'react'
import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { BiLogOut } from 'react-icons/bi'
import { FaDonate } from 'react-icons/fa'
import { Loader, Carousel, Content, SearchBar, Donations } from '@/components'
import useCurrentUser from '@/hooks/useCurrentUser'
import useNovelList from '@/hooks/useNovelList'
import useNovel from '@/hooks/useNovel'

// Protecting routes by fetching session on client side
export async function getServerSideProps(context: NextPageContext) {
   const session = await getSession(context)
   if (!session) { return { redirect: { destination: '/auth', permanent: false } } }
   return { props: {} };
}

const Profile = () => {
   const router = useRouter();
   const novelId = router.query.novel as string;
   
   const { data: user } = useCurrentUser();
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
         {(isLoading || !novels) ? <Loader/> : (<>
         <div className="fixed w-full px-24 pr-14 z-30 flex flex-col justify-between gap-8 bg-black bg-opacity-80">
            <nav className="flex flex-row justify-between pb-10 px-5">
               <div className="flex px-7 pt-9 gap-2 cursor-pointer" onClick={() => signOut()}>
                  <BiLogOut size={28} className="text-white" />
                  <span className="text-white text-xl font-semibold">Logout as {" "}
                     <strong className="text-gray-400 capitalize">{user?.username}</strong>
                  </span>
               </div>
               <div className="flex flex-row justify-center px-12 mt-9 gap-2">
                  <Donations />       
                  <FaDonate size={28} className="text-white" />
               </div>
            </nav>
         </div>
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

export default Profile