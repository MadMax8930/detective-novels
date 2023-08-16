import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { return res.status(405).end() }

   try {
     const { id } = req.body;

     const authorData = await prismadb.admin.findFirst({ 
        where: { id: id },
        select: {
            status: true,
            authorName: true,
            picture: true,
            biography: true,
            favoriteBooks: true,
            createdAt: true,
        } 
     });
     return res.status(200).json(authorData);
   } catch (error) {
     console.error(error)
     return res.status(400).end();
   }
}