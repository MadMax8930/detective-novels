import { GetServerSideProps } from 'next';
import prismadb from '@/lib/prismadb';
import { AdminJwtPayload } from '@/types'
import jwt from 'jsonwebtoken'

export const getAdminServerSidePropsProd: GetServerSideProps = async (context) => {
   const sessionToken = context.req.cookies['next-auth.admin-token'] || null;

   if (!sessionToken) {
      return {
         redirect: {
            destination: '/',
            permanent: false,
         },
      };
   }

   try {
      // Decode the token to get the adminId
      const decodedToken = decodeAdminToken(sessionToken);
      if (!decodedToken || !decodedToken.adminId) {
         throw new Error('Invalid admin token');
      }

      const user = await prismadb.user.findFirst({ where: { adminId: decodedToken.adminId } });

      if (!user || user.adminId === null) {
         return {
            redirect: {
               destination: '/profile',
               permanent: false,
            },
         };
      }

      return {
         props: {
            adminToken: sessionToken,
         },
      };
   } catch (error) {
      console.error(error);

      return {
         redirect: {
            destination: '/',
            permanent: false,
         },
      };
   }
};

// Helper function to decode the admin token
const decodeAdminToken = (token: string) => {
   try {
      const decodedToken = jwt.verify(token, `${process.env.ADMIN_JWT_SECRET}`) as AdminJwtPayload;
      return decodedToken;
   } catch (error) {
      console.error('Error decoding admin token:', error);
      return null;
   }
};
