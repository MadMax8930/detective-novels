import { NextApiRequest, NextApiResponse } from 'next'
// import serverAuth from '@/lib/serverAuth'
import prismadb from '@/lib/prismadb'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { res.status(405).end() }

   try {
   //   await serverAuth(req, res);

     const novels = await prismadb.novel.findMany()
     return res.status(200).json(novels);
   } catch (error) {
     console.log(error)
     res.status(400).end();
   }
}