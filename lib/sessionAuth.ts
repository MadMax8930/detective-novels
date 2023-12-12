import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import { SessionUserProps } from '@/types';

export const getSessionUser = async (req: NextApiRequest | any): Promise<SessionUserProps | null> => {
  const session = await getSession({ req });

  if (!session || !session.user || !session.user.email) { return null }

  const user = await prismadb.user.findUnique({
    where: { email: session.user?.email },
    select: { id: true, username: true, email: true, adminId: true },
  });

  if (!user) { return null }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    adminId: user.adminId,
  };
};