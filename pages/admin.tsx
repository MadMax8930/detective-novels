import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next';
import { Loader, Carousel, AdminForm, UsersInfo } from '@/components'
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
      <div className="w-screen min-h-full bg-white-main">
         <div className="bg-yellow-200 p-3 text-center text-lg fixed w-full top-0 z-30">
            This is the admin page
         </div>
         {(isLoading || !novels) ? <Loader/> : (
         <div className="flex flex-col gap-2 z-0">
            <Carousel novels={novels} adminPage={true} handleAdminSelectedNovelId={handleAdminSelectedNovelId} />
            <AdminForm token={token} adminSelectedNovelId={adminSelectedNovelId} reFetchedUpdatedList={reFetchedUpdatedList} />
         </div>)}
         <UsersInfo />
      </div>
   )
}

// export const getServerSideProps: GetServerSideProps = getAdminServerSideProps;

export default Admin


