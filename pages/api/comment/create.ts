import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'POST') { return res.status(405).end() }

   try {
     const { currentUser } = await serverAuth(req, res);

     const { novelId, content, parentCommentId } = req.body;

     const parentCommentExists = parentCommentId &&
        (await prismadb.comment.findUnique({
           where: { id: parentCommentId },
        }));

     const newUserComment = await prismadb.comment.create({
        data: { 
           userId: currentUser.id,
           novelId,
           content,
           parentCommentId: parentCommentExists ? parentCommentId : null,
        },
     });

     return res.status(201).json(newUserComment);
   } catch (error) {
     console.error(error);
     return res.status(500).json({ error: 'An error occurred while creating a comment' });
   }
}