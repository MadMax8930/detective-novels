import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import { SessionUserProps } from '@/types';
import prismadb from '@/lib/prismadb';

export const getSessionUser = async (req: NextApiRequest): Promise<SessionUserProps | null> => {
   const session = await getSession({ req });

   if (!session?.user?.email) { 
      return null;
   }

   const user = await prismadb.user.findUnique({
     where: { email: session.user?.email },
     select: { id: true, username: true, email: true, adminId: true },
   });

   return user ? { id: user.id, username: user.username, email: user.email, adminId: user.adminId } : null;
};

export const getUserSessionServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
   const session: SessionUserProps | null = await getSessionUser(context.req as NextApiRequest);
 
   if (!session?.email) {
     return {
       redirect: {
         destination: '/auth',
         permanent: false,
       },
     };
   }
 
   return {
     props: { session },
   };
};