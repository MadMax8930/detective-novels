import Image from 'next/image'
import Link from 'next/link'
import { footerLinks } from '@/constants'

const Footer = ({ bgLight }: { bgLight: boolean }) => (
   <footer className={`flex flex-col ${bgLight ? "text-gray-600" : "text-gray-300"} mt-5 border-t border-gray-400`}>
      {/* Logo & Links */}
      <div className='flex max-md:flex-col flex-wrap justify-between gap-3 sm:px-16 px-6 pb-2 pt-6 md:pt-8'>
         <div className='flex flex-col md:justify-start md:items-start items-center gap-2'>
            <Image src='/images/logo.png' alt='logo' width={110} height={20} className='object-contain' />
            <p className={`text-base ${bgLight ? "text-gray-700" : "text-gray-200"}`}>Vlad Novels &copy;</p>
            <p className={`text-lg font-semibold ${bgLight ? "text-gray-800" : "text-gray-100"}`}>Vladislav Surnin</p>
         </div>
         <div className="footer__links">
            {footerLinks.map((item) => (
               <div key={item.title} className="footer__link">
                  <h3 className="font-bold text-base sm:text-lg md:text-xl">{item.title}</h3>
                  <div className="flex flex-col gap-2 md:gap-4">
                     {item.links.map((link) => (
                        <Link key={link.title} href={link.url} className="text-gray-500 text-sm sm:text-base">{link.title}</Link>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
      {/* Terms & Condition */}
      <div className='flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 border-t border-gray-100 text-md sm:px-6 px-3 py-6 sm:py-10'>
         <p className={bgLight ? "text-gray-400" : "text-gray-300"}>@2023 Vlad Novels. All rights reserved</p>
         <div className="footer__copyrights-link">
            <Link href="/" className={bgLight ? "text-gray-400" : "text-gray-200"}>Privacy & Policy</Link>
            <Link href="/" className={bgLight ? "text-gray-400" : "text-gray-200"}>Terms & Condition</Link>
         </div>
      </div>
   </footer>
)

export default Footer