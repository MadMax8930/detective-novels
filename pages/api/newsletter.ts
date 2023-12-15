import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'
import prisma from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'PATCH') { return res.status(405).end() }

   try {
     const { currentUser } = await serverAuth(req, res);

     const updatedUser = await prisma.user.update({
        where: { id: currentUser.id },
        data: { receiveNewsletters: !currentUser.receiveNewsletters },
        select: { id: true, receiveNewsletters: true },
    });

     return res.status(200).json(updatedUser);
   } catch (error) {
     console.error(error);
     return res.status(500).end();
   }
}