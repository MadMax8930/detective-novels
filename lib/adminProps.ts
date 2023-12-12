// import { GetServerSideProps, NextPageContext } from 'next';
// import { getSessionUser } from '@/lib/sessionAuth';
// import { SessionUserProps } from '@/types';
// import prismadb from '@/lib/prismadb';

// export const getAdminServerSideProps: GetServerSideProps = async (context: NextPageContext) => {
//    const session: SessionUserProps | null = await getSessionUser(context.req);

//    // TODO
   
//    if (!session || !session.email) {
//       return {
//          redirect: {
//             destination: '/',
//             permanent: false,
//          },
//       };
//    }

//    // TODO

//    const user = await prismadb.user.findUnique({ where: { email: session.email } });

//    if (!user?.adminId) {
//       return {
//          redirect: {
//             destination: '/profile',
//             permanent: false,
//          },
//       };
//    }

//    const adminToken = context.req.cookies['next-auth.admin-token'] || null;

//    return {
//       props: {
//          adminToken,
//       },
//    };
// };