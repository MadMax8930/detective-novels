import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { return res.status(405).end() }

   try {
     const { currentUser } = await serverAuth(req, res);

     const allUserComments = await prismadb.comment.findMany({
        where: { userId: currentUser.id },
        include: {
           parentCommentObj: true,
           replies: true,
        }
     });

     return res.status(200).json(allUserComments);
   } catch (error) {
     console.error(error);
     return res.status(500).end();
   }
}