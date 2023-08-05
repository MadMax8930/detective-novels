import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Button } from '@/components'
import useCurrentUser from '@/hooks/useCurrentUser'

// Protecting routes by fetching session on client side
export async function getServerSideProps(context: NextPageContext) {
   const session = await getSession(context)
   if (!session) { return { redirect: { destination: '/auth', permanent: false } } }
   return { props: {} };
}

const Profile = () => {
   const router = useRouter();
   const { data: user } = useCurrentUser();

   return (
      <div className="h-full flex items-center justify-center bg-white-main">
         <div className="flex flex-col">
            <h1 className="text-3xl md:text-6xl text-black text-center">Welcome</h1>
            <div className="flex items-center justify-center gap-8 mt-10">
               <div onClick={() => router.push('/')}>

                  <div className="group flex-row w-44 mx-auto">
                     <div className="w-44 h-44 rounded-md flex items-center justify-center border-transparent
                        border-2 group-hover:border-white group-hover:cursor-pointer overflow-hidden">
                        <img src="/images/logo.png" alt="Profile" />
                     </div>
                        <Button 
                           title="Logout" 
                           btnType="button" 
                           additionalStyles="bg-primary-red text-primary-red-100 rounded-full min-w-[100px] py-3"
                           action={() => signOut()}
                        />
                     <div className="mt-4 text-gray-400 text-center group-hover:text-white">
                        {user?.username}
                     </div>
                  </div>

               </div>
            </div>
         </div>
      </div>
   )
};

export default Profile