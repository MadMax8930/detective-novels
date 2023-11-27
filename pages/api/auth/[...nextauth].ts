import NextAuth, { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'
import prismadb from '@/lib/prismadb'
import jwt from 'jsonwebtoken'

// User and Admin authentication
export const authOptions: AuthOptions = {
   providers: [
      Credentials({
         id: 'credentials',
         name: 'Credentials',
         credentials: { email: { label: 'Email', type: 'text' }, password: { label: 'Password', type: 'password' } },
         async authorize(credentials) {
            if(!credentials?.email || !credentials?.password) { throw new Error('Email and password required') }

            const user = await prismadb.user.findUnique({ where: { email: credentials.email } })
            if(!user || !user.hashedPassword) { throw new Error('Email does not exist') }

            const isCorrectPassword = await compare(credentials.password, user.hashedPassword)
            if(!isCorrectPassword) { throw new Error('Incorrect password') }

            // Generate token for users
            const sessionUser = { id: user.id, username: user.username, email: user.email };
            const userToken = jwt.sign(sessionUser, `${process.env.NEXTAUTH_JWT_SECRET}`, { expiresIn: '7d' });

            // Generate token for admins
            let adminToken = null;
            if (user.adminId !== null) {
               adminToken = jwt.sign({ adminId: user.adminId }, `${process.env.ADMIN_JWT_SECRET}`, { expiresIn: '3d' });
            };

            return { ...sessionUser, userToken, adminToken };
         }
      })
   ],
   pages: { signIn: '/auth' },
   debug: process.env.NODE_ENV === 'development',
   adapter: PrismaAdapter(prismadb),
   session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60, updateAge: 24 * 60 },
   jwt: { secret: process.env.NEXTAUTH_JWT_SECRET },
   secret: process.env.NEXTAUTH_SECRET,
   cookies: {
      sessionToken: {
        name: 'next-auth.session-token',
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
        },
      },
   }
};

export default NextAuth(authOptions);