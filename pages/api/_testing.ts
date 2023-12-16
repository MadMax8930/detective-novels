import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { return res.status(405).end() }

   try {

      const userData = await prismadb.user.findMany({
         include: {
            donations: true,
            comments: true,
            favoritesArray: true,
         },
      });

      const novelData = await prismadb.novel.findMany({
         include: {
            comments: true,
            favoritedByArray: true,
         },
      });

      const commentData = await prismadb.comment.findMany({
         include: {
            replies: true, 
         },
      });

      const adminData = await prismadb.admin.findMany({
         include: {
           users: {
             select: {
               id: true,
             },
           },
           sentNewsletters: {
             select: {
               id: true,
             },
           },
         },
      });
       
      const updatedAdminData = adminData.map(({ users, sentNewsletters, ...rest }) => ({
         ...rest,
         users: users.map((user) => user.id),
         sentNewsletters: sentNewsletters.map((newsletter) => newsletter.id),
      }));

       

      const favData = await prismadb.favorite.findMany();
      const newsletterData = await prismadb.newsletter.findMany();
      const donationData = await prismadb.donation.findMany();

      // console.log("user model", userData);
      // console.log("novel model", novelData);
      // console.log("comment model", commentData);
      // console.log("admin model", adminData);
      // console.log("fav model", favData);
      // console.log("newsletter model", newsletterData);
      // console.log("donation model", donationData);

      const TESTING = updatedAdminData

      return res.status(200).json(TESTING);
   } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'An unexpected error occurred while processing the request' });
   }
}

export default handler