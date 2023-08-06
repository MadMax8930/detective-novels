import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { BsXSquareFill } from 'react-icons/bs'
import { FaDonate } from 'react-icons/fa'
import useCurrentUser from '@/hooks/useCurrentUser'
import useNovel from '@/hooks/useNovel'
import { Carousel, SearchBar } from '@/components'

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
   const { data: selectedNovel } = useNovel(novelId);

   return (
      <div className="w-screen min-h-full bg-white-main">
         {/* Top Navigation */}
         <div className="fixed w-full px-24 pr-14 z-10 flex flex-col justify-between gap-8 bg-black bg-opacity-80">
            <nav className="flex flex-row justify-between pb-10 px-5">
               <div className="flex px-7 pt-9 gap-2 cursor-pointer" onClick={() => signOut()}>
                  <BsXSquareFill size={28} className="text-white" />
                  <span className="text-white text-xl font-semibold">Logout as {" "}
                     <strong className="text-gray-400">{user?.username}</strong>
                  </span>
               </div>
               <div className="flex flex-row justify-center px-12 pt-9 gap-2 cursor-pointer" onClick={() => router.push('/')}>
                  <span className="text-white text-xl font-semibold">Donations are appreciated</span>          
                  <FaDonate size={28} onClick={() => router.push('/')} className="text-white cursor-pointer" />
               </div>
            </nav>
       
         </div>
         <Carousel />
         {/* Search Bar*/}   
         <div className='flex flex-row justify-center pt-36'>
            <SearchBar initialValue={novelId} />
         </div>
         {/* Content */}
         <div className="py-16 px-36 text-justify">
            {selectedNovel ? (
               <>
                  <p className="text-green-400 text-1xl md:text-3xl font-bold">{selectedNovel?.title}</p><br /> 
                  <div className="text-black text-base font-serif">
                     {selectedNovel?.content}
                  </div>
               </>
            ) : selectedNovel !== novelId ? (
               <p className="text-red-500 text-xl font-semibold">Novel not found</p>
            ) : (
               null
            )}
         </div>

      </div>
   )
};

export default Profile