import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'DELETE') { return res.status(405).end() }

   try {
      const { novelId } = req.query;

      await prismadb.novel.delete({
         where: { id: String(novelId) }
      });
      res.status(204).end();
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while deleting the novel' });
   }
}
