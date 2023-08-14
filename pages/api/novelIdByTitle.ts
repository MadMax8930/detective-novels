import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { return res.status(405).end() }

   try {
     const { query } = req.query;  

     if (!query || typeof query !== 'string') { return res.status(400).json({ error: 'Invalid query' }) }

     const novel = await prismadb.novel.findFirst({
        where: {
           title: {
             startsWith: query,
             mode: "insensitive"
           }
         }
     });
     
     if (!novel) { return res.status(404).json({ error: 'Novel not found' }) }

     return res.status(200).json({ id: novel.id });
   } catch (error) {
     console.log(error)
     return res.status(500).json({ error: 'Internal Server Error' });
   }
}