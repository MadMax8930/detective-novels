import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import jwt from 'jsonwebtoken'
import prismadb from '@/lib/prismadb'

type AdminJwtPayload = {
   adminId: string;
};

// Admin middleware
const adminAuth = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
   console.log("adminAuth middleware triggered on adminForm Submit");
   
   try {
      const cookieToken = req.cookies['next-auth.admin-token'];
      console.log("cookieToken from Authorization Header:", cookieToken); 
      if (!cookieToken) { return res.status(401).json({ error: 'Unauthorized access. No Token' }) }

      // Verify the token and extract the payload
      const decodedToken = jwt.verify(cookieToken, `${process.env.ADMIN_JWT_SECRET}`) as AdminJwtPayload;
      console.log("Decoded Token:", decodedToken); 

      const admin = await prismadb.admin.findUnique({ where: { id: String(decodedToken.adminId) } });
      if (!admin) { return res.status(401).json({ error: 'Unauthorized access. No adminId' }) }

      // User authorized to proceed to the actual API handler
      handler(req, res);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'adminAuth server error has occurred' });
   }
};

export default adminAuth