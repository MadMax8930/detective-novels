import React, { useState, useEffect } from 'react'
import { GetServerSideProps, NextPageContext } from 'next';
import { Carousel, AdminForm, AdminInfoTabs, AdminSender, AdminChart, AdminLoader } from '@/components'
import useNovelList from '@/hooks/useNovelList'
// import { getAdminServerSideProps } from '@/lib/adminProps'
import { NovelDBProps } from '@/types'
import Cookies from 'js-cookie'
import { getSessionUser } from '@/lib/sessionAuth';
import { SessionUserProps } from '@/types';
import prismadb from '@/lib/prismadb';

interface AdminProps {
   adminToken: string;
}

export const Admin: React.FC<AdminProps> = ({ adminToken }) => {
   const { data: novels = [], mutate: refetchNovels, isLoading } = useNovelList();
   const [token, setToken] = useState(adminToken);
   const [adminSelectedNovelId, setAdminSelectedNovelId] = useState<string | undefined>(undefined);

   useEffect(() => {
      const retrievedToken = Cookies.get('next-auth.admin-token');
      if (retrievedToken) { setToken(retrievedToken); }
   }, []);

   const handleAdminSelectedNovelId = (novelId: string) => {
      const selectedCarouselNovel = novels.find((novel: NovelDBProps) => novel.id === novelId);
      if (selectedCarouselNovel) { setAdminSelectedNovelId(novelId); }
   };

   const reFetchedUpdatedList = async () => { await refetchNovels(); };

   return (
      <div className="w-screen min-h-full">
         <div className="admin-header"><span className='ml-6'>Administrator</span></div>
         <AdminInfoTabs />
         {!isLoading ? <> 
         <Carousel 
               novels={novels} 
               adminPage={true} 
               handleAdminSelectedNovelId={handleAdminSelectedNovelId} />
         <AdminForm 
               token={token} 
               adminSelectedNovelId={adminSelectedNovelId} 
               reFetchedUpdatedList={reFetchedUpdatedList} /></> : <AdminLoader/>}
         <AdminSender />
         <AdminChart />
      </div>
   )
}

export async function getServerSideProps(context: NextPageContext) {
   const session: SessionUserProps | null = await getSessionUser(context.req);

   // TODO
   
   if (!session || !session.email) {
      return {
         redirect: {
            destination: '/',
            permanent: false,
         },
      };
   }

   // TODO

   const user = await prismadb.user.findUnique({ where: { email: session.email } });

   if (!user?.adminId) {
      return {
         redirect: {
            destination: '/profile',
            permanent: false,
         },
      };
   }

   const req = context.req as any;
   const adminToken = req.cookies['next-auth.admin-token'];

   return {
      props: {
         adminToken,
      },
   };
};

export default Admin


