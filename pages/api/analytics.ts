import { NextApiRequest, NextApiResponse } from 'next'
import { startOfDay, endOfDay, format } from 'date-fns'
import prismadb from '@/lib/prismadb'
import adminAuth from '@/lib/adminAuth'

async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { return res.status(405).end() }

   try {
     const dailyResults = [];
     const currentDate = new Date();

     for (let i = 0; i < 7; i++) {  // Loop through each day of the week
        const startOfDayDate = startOfDay(currentDate);
        const endOfDayDate = endOfDay(currentDate);

        const usersWithComments = await prismadb.user.findMany({
          include: {
            comments: true,
          },
          where: {
            comments: {
              some: {
                createdAt: {
                  gte: startOfDayDate,
                  lte: endOfDayDate,
                },
              },
            },
          },
        });

        const usersWithFavorites = await prismadb.user.findMany({
          include: {
            favoritesArray: true,
          },
          where: {
            favoritesArray: {
              some: {
                createdAt: {
                  gte: startOfDayDate,
                  lte: endOfDayDate,
                },
              },
            },
          },
        });

        const commentsCount = usersWithComments.reduce((count, user: any) => count + user.comments?.length, 0);
        const favoritesCount = usersWithFavorites.reduce((count, user: any) => count + user.favoritesArray?.length, 0);

        dailyResults.push({
           day: format(startOfDayDate, 'EEE'),
           comment: commentsCount,
           favorite: favoritesCount,
        });

        currentDate.setDate(currentDate.getDate() - 1);  // Move to the previous day
     }
 
     const reversedResults = dailyResults.reverse();
     return res.status(200).json(reversedResults);
   } catch (error) {
     console.error(error)
     return res.status(500).json({ error: 'An unexpected error occurred while processing the request' })
   }
}

export default adminAuth(handler);