import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { res.status(405).end() }

   try {
     const novels = await prismadb.novel.findMany();
     const currentUser: Record<string, any> | null = await serverAuth(req, res).catch(() => null);
  
     const filteredNovels = novels.map(({ content, ...novel }) => ({
        ...novel,
        ...(currentUser ? { content } : {}),
     }));
  
     return res.status(200).json(filteredNovels);
   } catch (error) {
     console.log(error)
     return res.status(400).end();
   }
}