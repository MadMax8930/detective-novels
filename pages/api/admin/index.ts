import { NextApiRequest, NextApiResponse } from 'next'
import { ITEMS_PER_PAGE } from '@/constants'
import prismadb from '@/lib/prismadb'
import adminAuth from '@/lib/adminAuth'

async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { return res.status(405).end() }

   try {
      const { adminId, query, portion } = req.query;
      if(typeof adminId !== 'string' || !adminId) { throw new Error('Invalid ID') }

      const admin = await prismadb.admin.findUnique({ where: { id: String(adminId) } });
      if (!admin) { return res.status(404).json({ error: 'Admin not found' }); }
    
      const users = await prismadb.user.findMany({
         where: {
            admin: null,
            username: {
               contains: query as string,
               mode: 'insensitive',
            },
         },
         select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
         },
         take: ITEMS_PER_PAGE,
         skip: (parseInt(portion as string) - 1) * ITEMS_PER_PAGE,
      });
  
      const donations = await prismadb.donation.findMany({
         where: {
            donator: {
               contains: query as string,
               mode: 'insensitive',
            },
         },
         select: {
            id: true,
            amount: true,
            donator: true,
            message: true,
            createdAt: true,
            user: {
               select: {
                  id: true,
                  username: true,
                  email: true,
               },
            },
         },
         take: ITEMS_PER_PAGE,
         skip: (parseInt(portion as string) - 1) * ITEMS_PER_PAGE,
      });

      const usersCount = await prismadb.user.count();
      const donationsCount = await prismadb.donation.count();
   
      return res.status(200).json({ 
         admin: adminId, 
         users, 
         donations,
         usersCount,
         donationsCount,
      });
   } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'An unexpected error occurred while processing the request' })
   }
}

export default adminAuth(handler);
