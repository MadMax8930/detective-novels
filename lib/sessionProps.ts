import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { SessionUserProps } from '@/types';
import prismadb from '@/lib/prismadb';

export const getSessionUser = async (req: NextApiRequest, res: NextApiResponse): Promise<SessionUserProps | null> => {
   const session = await getSession({ req });

   console.log('No session', session);

   if (!session?.user?.email) { 
      // Check content type and handle accordingly
      const contentType = res.getHeader('content-type') as string;
      if (contentType && contentType.includes('text/html')) {
        console.log('Received HTML response. Returning null.');
        return null;
      }
      return null;
   }

   const user = await prismadb.user.findUnique({
     where: { email: session.user?.email },
     select: { id: true, username: true, email: true, adminId: true },
   });

   console.log('User:', user);

   return user
     ? { id: user.id, username: user.username, email: user.email, adminId: user.adminId }
     : null;
};

export const getUserSessionServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
   const session: SessionUserProps | null = await getSessionUser(context.req as NextApiRequest, context.res as NextApiResponse);
 
   // if (!session?.email) {
   //   return {
   //     redirect: {
   //       destination: '/auth',
   //       permanent: false,
   //     },
   //   };
   // }
 
   return {
     props: { session },
   };
};