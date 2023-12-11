import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import prisma from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'POST') { return res.status(405).end() }

   try {
      const { username, email, password, adminId } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10); 
      const newUser = await prisma.user.create({
         data: { username, email, hashedPassword, adminId },
      });

      return res.status(201).json(newUser);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while creating the user' });
   }
}