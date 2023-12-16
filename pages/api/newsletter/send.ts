import { NextApiRequest, NextApiResponse } from 'next'
import serverAuth from '@/lib/serverAuth'
import prisma from '@/lib/prismadb'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'POST') { return res.status(405).end() }

   try {
     const { currentUser } = await serverAuth(req, res);
     if (!currentUser.adminId) { return res.status(403).json({ error: 'Forbidden' }) }

     const { title, content } = req.body;
     if (!title || !content) { return res.status(400).json({ error: 'Title & content are required' }) }

     await prisma.newsletter.create({ data: { title, content } });

     // Fetch users with receiveNewsletters set to true
     const newsletterUsers = await prisma.user.findMany({
        where: { receiveNewsletters: true },
        select: { email: true },
     });
     
     const recipientEmails = newsletterUsers.map((user) => user.email);
     await sendEmail(recipientEmails, title, content );

     return res.status(200).json({ success: true });
   } catch (error) {
     console.error(error);
     return res.status(500).json({ error: 'Internal Server Error' });
   }
}

// Authenticate Gmail SMTP server using an app-specific password
async function sendEmail(recipients: string[], title: string, content: string) {
   try {
     const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
         },
     });

     const mailOptions = {
         from: `VladNovels <${process.env.SMTP_USER}>`,
         to: recipients.join(', '),
         subject: `Newsletter - ${title}`,
         text: content,
     };

     await transporter.sendMail(mailOptions);
     recipients.forEach((person) => {
        console.log(`Email sent to user ${person} - (${title}): ${content}`);
     });
   } catch (error) {
     console.error('Error sending newsletter:', error);
     throw error;
   }
}
