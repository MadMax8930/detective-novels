import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { return res.status(405).end() }

   try {
     const { currentUser } = await serverAuth(req, res);

     const commentId = req.query.commentId as string;

     const comment = await prismadb.comment.findUnique({
        where: { id: commentId, userId: currentUser.id },
     });

     if (!comment) {
        return res.status(404).json({ error: 'Comment not found.' });
     }

     return res.status(200).json(comment);
   } catch (error) {
     console.error(error);
     return res.status(500).json({ error: 'Internal Server Error' });
   }
}
