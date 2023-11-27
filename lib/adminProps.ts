import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react'
import prismadb from '@/lib/prismadb';

export const getAdminServerSideProps: GetServerSideProps = async (context) => {
   const session = await getSession(context);
   console.log('admin Session:', session);

   const adminToken = context.req.cookies['next-auth.admin-token'] || null;

   return {
      props: {
         adminToken,
      },
   };
};