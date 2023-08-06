import Image from 'next/image'
import Link from 'next/link'
import { footerLinks } from '@/constants'

const Footer = ({ bgLight }: { bgLight: boolean }) => {

   return (
      <footer className={`flex flex-col ${bgLight ? "text-gray-600" : "text-gray-300"} mt-5 border-t border-gray-400`}>
         {/* Logo & Links */}
         <div className='flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10'>
            <div className='flex flex-col justify-start items-start gap-6'>
               <Image src='/images/logo.png' alt='logo' width={120} height={20} className='object-contain' />
               <p className={`text-base ${bgLight ? "text-gray-800" : "text-gray-200"}`}>Vlad Novels 2023 <br /> All Rights Reserved &copy;</p>
            </div>
            <div className="footer__links">
               {footerLinks.map((item) => (
                  <div key={item.title} className="footer__link">
                     <h3 className="font-bold">{item.title}</h3>
                     <div className="flex flex-col gap-5">
                        {item.links.map((link) => (
                           <Link key={link.title} href={link.url} className="text-gray-500">{link.title}</Link>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>
         {/* Terms & Condition */}
         <div className='flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10'>
            <p className={bgLight ? "text-gray-400" : "text-gray-300"}>@2023 Vlad Novels. All rights reserved</p>
            <div className="footer__copyrights-link">
               <Link href="/" className={bgLight ? "text-gray-400" : "text-gray-200"}>Privacy & Policy</Link>
               <Link href="/" className={bgLight ? "text-gray-400" : "text-gray-200"}>Terms & Condition</Link>
            </div>
         </div>
      </footer>
   )
}

export default Footer