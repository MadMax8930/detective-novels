import { NextApiRequest, NextApiResponse } from 'next';

export type AuthorizeDevMiddleware = (
  req: NextApiRequest & { userType: 'developer' | 'regular' },
  res: NextApiResponse
) => void;

const authorizeDev: AuthorizeDevMiddleware = (req, res) => {
   const apiKey = req.headers['dev-api-key'];

   if (apiKey === process.env.AUTHORIZED_DEV) {
     req.userType = 'developer';
   } else {
     req.userType = 'regular';
     return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
   }
};

export default authorizeDev
