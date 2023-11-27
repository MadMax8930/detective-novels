import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prismadb from '@/lib/prismadb'

// User middleware: Handles authentication and retrieves current user data
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
   const session = await getServerSession(req, res, authOptions);
   console.log('Session:', session);
   if (!session?.user?.email) { throw new Error('User not authenticated.') }

   const currentUser = await prismadb.user.findUnique({ 
      where: { email: session.user.email },
      select: { id: true, username: true, email: true, adminId: true }
   })
   if (!currentUser) { throw new Error('User not found.') }

   return { currentUser, adminId: currentUser.adminId };
}

export default serverAuth;