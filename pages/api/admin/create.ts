import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'
import adminAuth from '@/lib/adminAuth'

async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'POST') { return res.status(405).end() }

   try {
      const { title, description, author, preview, content, genre, coverImage } = req.body;

      const novel = await prismadb.novel.create({
         data: { title, description, author, preview, content, genre, coverImage },
      });
      res.status(201).json(novel);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while creating the novel' });
   }
}

export default adminAuth(handler);
