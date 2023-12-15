import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'
import prisma from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'POST') { return res.status(405).end() }

   try {
     const { currentUser } = await serverAuth(req, res);
     
     if (!currentUser.adminId) { return res.status(403).json({ error: 'Forbidden' }) }

     // Fetch users with receiveNewsletters set to true
     const newsletterUsers = await prisma.user.findMany({
        where: { receiveNewsletters: true },
        select: { email: true },
     });

     // Your logic to send newsletters to the users' emails
     return res.status(200).json({ success: true });
   } catch (error) {
     console.error(error);
     return res.status(500).json({ error: 'Internal Server Error' });
   }
}
