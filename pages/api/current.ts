import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET') { return res.status(405).end() }

   try {
   //   const { currentUser } = await serverAuth(req, res)


    // Directly log or return the session object
    const session = await getServerSession(req, res, authOptions)
    console.log('Curr Session:', session)

    // Continue with the rest of the logic using session if available
    if (!session?.user?.email) {
      throw new Error('User not authenticated.')
    }

    const currentUser = await prismadb.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, username: true, email: true, adminId: true },
    })

    if (!currentUser) {
      throw new Error('User not found.')
    }
     return res.status(200).json(currentUser);
   } catch (error) {
     console.error(error)
     return res.status(400).end();
   }
}