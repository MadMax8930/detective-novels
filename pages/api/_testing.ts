import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { return res.status(405).end() }

   try {

      /* USER */

      const userDataNaked = await prismadb.user.findMany();

      const userDataIdObj = await prismadb.user.findMany({
         select: {
           donations: {
             select: {
               id: true,
             },
           },
           comments: {
             select: {
               id: true,
             },
           },
           favoriteIdsArray: {
             select: {
               id: true,
             },
           },
         },
      });

      const userDataFullObj = await prismadb.user.findMany({
         select: {
            id: true,
            donations: true,
            comments: true,
            favoriteIdsArray: true,
         },
      });

      const userDataWithArray = userDataFullObj.map(({ comments, donations, favoriteIdsArray, ...rest }) => ({
         ...rest,
         donations: donations.map((donate) => donate.id),
         comments: comments.map((comment) => comment.id),
         favoriteIdsArray: favoriteIdsArray.map((favorite) => favorite.id),
      }));

      /* NOVEL */

      const novelDataNaked = await prismadb.novel.findMany();

      const novelDataIdObj = await prismadb.novel.findMany({
         select: {
           comments: {
             select: {
               id: true,
             },
           },
           favoriteIdsArray: {
             select: {
               id: true,
             },
           },
         },
      });

      const novelDataFullObj = await prismadb.novel.findMany({
         select: {
            id: true,
            comments: true,
            favoriteIdsArray: true,
         },
      });

      const novelDataWithArray = novelDataFullObj.map(({ comments, favoriteIdsArray, ...rest }) => ({
         ...rest,
         comments: comments.map((comment) => comment.id),
         favoriteIdsArray: favoriteIdsArray.map((favorite) => favorite.id),
      }));

      /* FAVORITE */

      const favData = await prismadb.favorite.findMany();

      /* COMMENT */

      const commentDataNaked = await prismadb.comment.findMany();

      const commentDataIdObj = await prismadb.comment.findMany({
         include: {
           replies: {
             select: {
               id: true,
             },
           },
           parentCommentObj: {
             select: {
               id: true,
             },
           },
         },
      });

      const commentDataFullObj = await prismadb.comment.findMany({
         include: {
            replies: true,
            parentCommentObj: true
         },
      });

      const commentDataWithArray = commentDataFullObj.map(({ replies, ...rest }) => ({
         ...rest,
         replies: replies.map((reply) => reply.id),
      }));

      /* ADMIN */

      const adminDataNaked = await prismadb.admin.findMany();

      const adminDataIdObj = await prismadb.admin.findMany({
         include: {
           users: {
             select: {
               id: true,
             },
           },
           newsletters: {
             select: {
               id: true,
             },
           },
         },
      });

      const adminDataFullObj = await prismadb.admin.findMany({
         include: {
           users: true,
           newsletters: true
         },
      });
       
      const adminDataWithArray = adminDataFullObj.map(({ users, newsletters, ...rest }) => ({
         ...rest,
         users: users.map((user) => user.id),
         newsletters: newsletters.map((newsletter) => newsletter.id),
      }));

      /* NEWSLETTER */

      const newsletterData = await prismadb.newsletter.findMany();

      /* DONATION */

      const donationData = await prismadb.donation.findMany();   
      
      // console.log("user model", userData);
      // console.log("novel model", novelData);
      // console.log("fav model", favData);
      // console.log("comment model", commentData);
      // console.log("admin model", adminData);
      // console.log("newsletter model", newsletterData);
      // console.log("donation model", donationData);

      const TESTING = commentDataIdObj

      return res.status(200).json(TESTING);
   } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'An unexpected error occurred while processing the request' });
   }
}

export default handler