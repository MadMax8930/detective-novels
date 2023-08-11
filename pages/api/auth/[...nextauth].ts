import NextAuth, { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'
import prismadb from '@/lib/prismadb'
import jwt from 'jsonwebtoken'
import { setAuthToken} from '@/lib/authToken'

// Middleware
export const authOptions: AuthOptions = {
   providers: [
      Credentials({
         id: 'credentials',
         name: 'Credentials',
         credentials: { email: { label: 'Email', type: 'text' }, password: { label: 'Password', type: 'password' } },
         async authorize(credentials) {
            console.log("Authorize function called");
            if(!credentials?.email || !credentials?.password) { throw new Error('Email and password required') }

            const user = await prismadb.user.findUnique({ where: { email: credentials.email } })
            if(!user || !user.hashedPassword) { throw new Error('Email does not exist') }

            const isCorrectPassword = await compare(credentials.password, user.hashedPassword)
            if(!isCorrectPassword) { throw new Error('Incorrect password') }

            const token = jwt.sign({ adminId: user.adminId }, `${process.env.ADMIN_JWT_SECRET}`, { expiresIn: '1d' });
            console.log("Generated Token:", token);
            setAuthToken(token);

            const sessionUser = { ...user, token };
   
            const sessionToken = jwt.sign(sessionUser, `${process.env.ADMIN_JWT_SECRET}`);
            console.log("Session Token (HttpOnly cookie):", sessionToken);

            return { ...sessionUser, sessionToken };
         }
      })
   ],
   pages: { signIn: '/auth' },
   debug: process.env.NODE_ENV === 'development',
   adapter: PrismaAdapter(prismadb),
   session: { strategy: 'jwt' },
   jwt: { secret: process.env.NEXTAUTH_JWT_SECRET },
   secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);