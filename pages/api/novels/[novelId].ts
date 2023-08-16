import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { res.status(405).end() }

   try {
     const { novelId } = req.query
     if(typeof novelId !== 'string' || !novelId) { throw new Error('Invalid ID') }

     const novel = await prismadb.novel.findUnique({ where: { id: novelId } })
     if(!novel) { throw new Error('Invalid ID') }

     const currentUser: Record<string, any> | null = await serverAuth(req, res).catch(() => null);

     const filteredNovel = currentUser ? novel : { ...novel, content: undefined };
     return res.status(200).json(filteredNovel);
   } catch (error) {
     console.error(error)
     return res.status(400).end();
   }
}