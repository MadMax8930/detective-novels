import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { return res.status(405).end() }

   try {
     const latestNewsletter = await prismadb.newsletter.findFirst({
        orderBy: { createdAt: 'desc' },
        select: { title: true, content: true, createdAt: true },
     });

     if (!latestNewsletter) { return res.status(404).json({ error: 'No newsletters found' }) }
     
     return res.status(200).json(latestNewsletter);
   } catch (error) {
     console.error('Error fetching latest newsletter:', error);
     return res.status(500).json({ error: 'Internal Server Error' });
   }
}