import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'
// import serverAuth from '@/lib/serverAuth'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { res.status(405).end() }

   try {
     //  await serverAuth(req, res);
     const { novelId } = req.query
     if(typeof novelId !== 'string') { throw new Error('Invalid ID') }
     if(!novelId) { throw new Error('Invalid ID') }

     const novel = await prismadb.novel.findUnique({ where: { id: novelId } })
     if(!novel) { throw new Error('Invalid ID') }

     return res.status(200).json(novel);
   } catch (error) {
     console.log(error)
     res.status(400).end();
   }
}