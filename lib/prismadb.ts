import { PrismaClient } from '@prisma/client';

const getClient = () => {

 
      global.prismadb = new PrismaClient();
   

   return global.prismadb;
};

const prisma = getClient();
export default prisma;