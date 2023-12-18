import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'POST' && req.method !== 'DELETE') { return res.status(405).end() }

   try {
     const { currentUser } = await serverAuth(req, res);

     const { novelId } = req.method === 'POST' ? req.body : req.query;
     if (!novelId || typeof novelId !== 'string') return res.status(400).json({ message: 'Invalid Novel Id' });

     const novel = await prismadb.novel.findUnique({
        where: { id: novelId },
        include: {
           favoriteIdsArray: true
        }
     });

     if (!novel) return res.status(404).json({ message: 'Novel doesn\'t exist' });

     if (req.method === 'POST') {

        if (!novel.favoriteIdsArray.some((fav) => fav.userId === currentUser.id)) {
          const createdFavorite = await prismadb.favorite.create({
            data: {
              userId: currentUser.id,
              novelId: novel.id,
            },
          });

          return res.status(200).json({ message: 'Novel added to the favorites', data: createdFavorite });
        } else {
          return res.status(200).json({ message: 'Novel is already in favorites.' });
        }
     }

     if (req.method === 'DELETE') {

        const existingFavorite = await prismadb.favorite.findFirst({
          where: {
            userId: currentUser.id,
            novelId: novel.id,
          },
        });
    
        if (existingFavorite) {
          await prismadb.favorite.delete({
            where: {
               id: existingFavorite.id,
            },
          });
 
          return res.status(200).json({ message: 'Novel removed from favorites.' });
        } else {
          return res.status(200).json({ message: 'Novel is not in favorites.' });
        }
     }

   } catch (error) {
     console.error(error);
     return res.status(500).end();
   }
}