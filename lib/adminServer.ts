import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react'
import prismadb from '@/lib/prismadb';

export const getAdminServerSideProps: GetServerSideProps = async (context) => {
   const session = await getSession(context);

      if (!session?.user?.email) {
         return {
            redirect: {
               destination: '/',
               permanent: false,
            },
         };
      }

   const user = await prismadb.user.findUnique({ where: { email: session.user.email } });

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