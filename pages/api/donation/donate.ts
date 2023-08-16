import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'POST') { return res.status(405).end() }

   try {
     const { userId, amount, donator, message } = req.body;

     const makeNewDonation = await prismadb.donation.create({
        data: { 
            amount, 
            donator, 
            message,
            user: { 
               connect: { id: userId },
            } 
        },
        include: {
            user: {
               select: {
                  id: true,
                  username: true,
                  email: true,
               }
            }
        },
     });

     return res.status(201).json({ success: 'Donation successfully created!', donation: makeNewDonation });
   } catch (error) {
     console.error(error);
     return res.status(500).json({ error: 'An unexpected error occurred while processing the request' });
   }
}