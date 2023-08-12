import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next';
import { Carousel, AdminForm } from '@/components'
import useNovelList from '@/hooks/useNovelList'
import { getAdminServerSideProps } from '@/lib/adminServer'
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
          <div className="bg-yellow-200 p-3 text-center text-lg fixed w-full top-0 z-30">
            This is the admin page
         </div>
         <div className="flex flex-col gap-2 z-0">
            <Carousel novels={novels} adminPage={true} />
            <AdminForm token={token} />
         </div>
      </div>
   )
}

export const getServerSideProps: GetServerSideProps = getAdminServerSideProps;

export default Admin


