import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components'

const Navbar = () => {
  return (
    <header className="w-full absolute z-1000 right-0 bg-black-100">
      <nav className="max-w-[1150px] mx-auto flex justify-between items-center sm:px-16 px-6 py-6">
         {/* Left Side */}
         <div className="flex flex-wrap justify-between items-center text-primary-blue-100 font-bold text-[22px] gap-3">
            <Link href={"/profile"} className="flex justify-center items-center">
               <Image src="/images/logo.png" alt="logo" width={50} height={20} className="object-contain" />
            </Link>
            <h1 className="border-b-2 border-t-2">Vlad Novels</h1>
         </div>
         {/* Right Side */}
         <div className="flex justify-between gap-2">
            <Link href={{ pathname: '/auth', query: { variant: 'login' } }}>
               <Button 
                  title="Sign In" 
                  btnType="button" 
                  additionalStyles="bg-primary-blue-100 text-black-100 rounded-full min-w-[100px] py-3" 
               />
            </Link>
            <Link href={{ pathname: '/auth', query: { variant: 'register' } }}>
               <Button 
                  title="Sign Up" 
                  btnType="button" 
                  additionalStyles="bg-primary-red text-primary-red-100 rounded-full min-w-[100px] py-3" 
               />
            </Link>
         </div>
      </nav>
    </header>
  )
}

export default Navbar