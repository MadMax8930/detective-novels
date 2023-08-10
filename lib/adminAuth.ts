import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import jwt from 'jsonwebtoken'
import prismadb from '@/lib/prismadb'

type AdminJwtPayload = {
   adminId: string;
};

const adminAuth = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {

   console.log("adminAuth middleware triggered");
   
   try {
      // Extract the token from the Authorization header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) { return res.status(401).json({ error: 'Unauthorized access' }) }

      // Verify the token and extract the payload
      const decodedToken = jwt.verify(token, `${process.env.ADMIN_JWT_SECRET}`) as AdminJwtPayload;
      console.log("Decoded Token:", decodedToken); 

      // Fetch the admin from the database using the decoded token's adminId
      const admin = await prismadb.admin.findUnique({
         where: { id: String(decodedToken.adminId) }
      });

      if (!admin) { return res.status(401).json({ error: 'Unauthorized access' }) }

      // User is authorized to proceed to the actual API handler
      return handler(req, res);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'A server error has occurred' });
   }
};

export default adminAuth