import { NextApiRequest, NextApiResponse } from 'next';
import { CommentReplyProps } from '@/types';
import serverAuth from '@/lib/serverAuth';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { return res.status(405).end(); }

   try {
     const { currentUser } = await serverAuth(req, res);
     if (!currentUser) { return res.status(401).json({ error: 'Unauthorized' }); }

     const userId = currentUser.id;

     const userComments = await prismadb.comment.findMany({
        where: {
           userId: userId,
           replies: {
              some: {},
           }, 
        },
        select: {
           id: true,
           replies: {
              select: {
               id: true,
               userId: true,
               content: true,
               createdAt: true,
               novelId: true,
               parentCommentId: true,
               user: {
                  select: {
                     username: true,
                  }
               }
           },
         },
       },
        orderBy: { createdAt: 'desc' },
     });

     const allReplies: CommentReplyProps[] = userComments.reduce(
       (acc: CommentReplyProps[], comment) => acc.concat(comment.replies as CommentReplyProps[]), []
     );

     const replyCount = allReplies.length;

     return res.status(200).json({ replyCount, replies: allReplies })
   } catch (error) {
     console.error(error);
     return res.status(500).end();
   }
}