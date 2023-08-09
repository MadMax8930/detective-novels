import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { BiLogOut } from 'react-icons/bi'
import { FaDonate } from 'react-icons/fa'
import useCurrentUser from '@/hooks/useCurrentUser'
import useNovelList from '@/hooks/useNovelList'
import { Carousel, Content, SearchBar, Donations, Footer } from '@/components'

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
   const { data: novels = [] } = useNovelList();

   return (
      <div className="w-screen min-h-full bg-white-main">
         {/* Top Navigation */}
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
         <Carousel novels={novels} />
         <SearchBar initialValue={novelId} />
         <Content linesPerPage={15} />
         {/* Footer */}
         <div className="container h-full mx-auto xl:px-30 max-w-7xl"> 
            <Footer bgLight={true} />
         </div>
      </div>
   )
};

export default Profile