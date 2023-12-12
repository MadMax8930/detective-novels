import { PrismaClient } from '@prisma/client';

const getClient = () => {

   if (!global.prismadb) {
      global.prismadb = new PrismaClient();
   }

   return global.prismadb;
};

const prisma = getClient();
export default prisma;