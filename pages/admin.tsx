import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next';
import { Carousel, AdminForm, AdminInfoTabs, AdminSender, AdminChart, AdminLoader } from '@/components'
import useNovelList from '@/hooks/useNovelList'
import { getAdminServerSideProps } from '@/lib/adminProps'
import { NovelDBProps } from '@/types'
import Cookies from 'js-cookie'

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

export const getServerSideProps: GetServerSideProps = getAdminServerSideProps;

export default Admin


