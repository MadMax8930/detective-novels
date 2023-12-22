import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'PUT') { return res.status(405).end() }

   try {
     const { currentUser } = await serverAuth(req, res);

     const { content } = req.body;
     const commentId = req.query.commentId as string;

     const comment = await prismadb.comment.findUnique({
        where: { id: commentId },
     });

     if (!comment || comment.userId !== currentUser.id) {
        return res.status(403).json({ error: 'Forbidden: You cannot update this comment' });
     }

     const updatedComment = await prismadb.comment.update({
        where: { id: commentId },
        data: { content },
     });

     return res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
   } catch (error) {
     console.error(error);
     return res.status(500).json({ error: 'An error occurred while updating a comment' });
   }
}