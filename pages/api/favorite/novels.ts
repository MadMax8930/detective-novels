import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { return res.status(405).end() }

   try {
     const { currentUser } = await serverAuth(req, res);

     const allUserFavorites = await prismadb.favorite.findMany({
        where: { userId: currentUser.id },
     });

     const novelIdsArray = allUserFavorites.filter((fav) => fav.novelId !== null)
                                           .map((fav) => fav.novelId as string);

     const userFavoriteNovels = await prismadb.novel.findMany({
        where: {
          id: { in: novelIdsArray },
        },
     });

     return res.status(200).json(userFavoriteNovels);
   } catch (error) {
     console.error(error);
     return res.status(500).end();
   }
}