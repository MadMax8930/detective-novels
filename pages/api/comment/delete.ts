import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'DELETE') { return res.status(405).end() }

   try {
     const { currentUser } = await serverAuth(req, res);

     const commentId = req.query.commentId as string;

     const comment = await prismadb.comment.findUnique({
        where: { id: commentId },
        include: { 
           replies: true,
           parentCommentObj: true,
        },
     });

     if (!comment || comment.userId !== currentUser.id) {
        return res.status(403).json({ error: 'Forbidden: You cannot delete this comment' });
     }

     await prismadb.comment.deleteMany({
        where: { 
          OR: [
             { id: commentId, userId: currentUser.id }, 
             { parentCommentId: commentId }
          ], 
        },
     });

     return res.status(204).end();
   } catch (error) {
     console.error(error);
     return res.status(500).json({ error: 'An error occurred while deleting a comment' });
   }
}