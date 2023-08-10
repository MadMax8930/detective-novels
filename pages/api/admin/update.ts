import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'
import adminAuth from '@/lib/adminAuth'

async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'PUT') { return res.status(405).end() }

   try {
      const { novelId } = req.query;
      const { title, description, author, preview, content, genre, coverImage } = req.body;

      const updatedNovel = await prismadb.novel.update({
         where: { id: String(novelId) },
         data: { title, description, author, preview, content, genre, coverImage },
      });
      res.status(200).json(updatedNovel);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while updating the novel' });
   }
}

export default adminAuth(handler);
