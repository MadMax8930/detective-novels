import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react'
import { Carousel, AdminForm } from '@/components'
import useNovelList from '@/hooks/useNovelList'
import Cookies from 'js-cookie'

interface AdminProps {
   customToken: string;
}

export const Admin: React.FC<AdminProps> = ({ customToken }) => {
   const { data: novels = [] } = useNovelList();
   const [token, setToken] = useState(customToken);

   useEffect(() => {
      const retrievedToken = Cookies.get('next-auth.admin.token');
      console.log('Fetched Token:', retrievedToken);
      if (retrievedToken) { setToken(retrievedToken); }
    }, []);

   return (
      <div className="w-screen min-h-full bg-white-main">
         <div className="flex flex-col gap-4">
            <Carousel novels={novels} />
            <AdminForm token={token} />
         </div>
      </div>
   )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const session = await getSession(context);

      if (!session?.user?.email) {
         return {
            redirect: {
               destination: '/',
               permanent: false,
            },
         };
      }
      
   const user: any = fetch('/api/current').then(res => res.json())

      if (!user?.adminId) {
         return {
            redirect: {
               destination: '/profile',
               permanent: false,
            },
         };
      }

   const customToken = context.req.cookies['next-auth.admin-token'] || '';

   return {
      props: {
         customToken,
      },
   };
};

export default Admin


