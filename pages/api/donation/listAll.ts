import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'
import adminAuth from '@/lib/adminAuth'

async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { return res.status(405).end() }

   try {
     const allDonations = await prismadb.donation.findMany({
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
     });

     return res.status(200).json(allDonations);
   } catch (error) {
     console.error(error);
     return res.status(500).json({ error: 'An unexpected error occurred while processing the request' });
   }
}

export default adminAuth(handler);