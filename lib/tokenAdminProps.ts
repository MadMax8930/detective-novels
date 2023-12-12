import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { getSessionUser } from '@/lib/sessionProps';
import { SessionUserProps } from '@/types';

export const getAdminTokenServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
   const session: SessionUserProps | null = await getSessionUser(context.req as NextApiRequest, context.res as NextApiResponse);

   if (!session?.email) {
     return {
       redirect: {
         destination: '/',
         permanent: false,
       },
     };
   }

   if (!session?.adminId) {
     return {
       redirect: {
         destination: '/profile',
         permanent: false,
       },
     };
   }

   const adminToken = context.req.cookies['next-auth.admin-token'] || null;

   return {
     props: { adminToken },
   };
};