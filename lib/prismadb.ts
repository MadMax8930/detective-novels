import { PrismaClient } from '@prisma/client';

const getClient = () => {
   if (process.env.NODE_ENV === 'production') {
      return new PrismaClient();
   }

   if (!global.prismadb) {
      global.prismadb = new PrismaClient();
   }

   return global.prismadb;
};

const prisma = getClient();
export default prisma;