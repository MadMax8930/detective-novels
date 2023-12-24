import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { return res.status(405).end() }

   try {
     const { currentUser } = await serverAuth(req, res);
     if (!currentUser) { return res.status(401).json({ error: 'Unauthorized' }) };

     const novelId = req.query.novelId as string;
  
     const allNovelComments = await prismadb.comment.findMany({
        where: { novelId: novelId },
        include: {
           user: {
              select: {
                 username: true,
              }
           },
           parentCommentObj: {
              include: {
                 user: {
                    select: {
                       username: true,
                    }
                 }
              }
           },
           replies: true,
        },
        orderBy: { createdAt: 'desc' },
     });

     return res.status(200).json(allNovelComments);
   } catch (error) {
     console.error(error);
     return res.status(500).end();
   }
}