import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { Button } from '@/components'
import { NavbarProps } from '@/types'

const Navbar: React.FC<NavbarProps>  = ({ isUser, isAdmin }) => {
   const router = useRouter();
   const targetPath = router.pathname === '/profile' ? '/profile/lounge' : '/profile';
   const targetTitle = router.pathname === '/profile' ? 'Lounge' : 'Profile';
   const handleSignOut = async () => { await signOut(); localStorage.removeItem('auth-toast'); };
  return (
    <header className="w-full fixed top-0 z-30 right-0 bg-black bg-opacity-90">
      <nav className="max-w-[1275px] mx-auto flex flex-row justify-between items-center sm:px-16 px-6 pt-4 md:pb-4 pb-2">
         {/* Left Side */}
         <div className="flex flew-wrap justify-between items-center text-primary-blue-100 font-bold text-lg sm:text-xl gap-3 mb-3">
            <Link href={"/profile"}>
               <Image src="/images/logo.png" alt="logo" width={44} height={20} className="object-contain md:block hidden w-auto h-auto" priority />
               <Image src="/images/logo.png" alt="logo" width={36} height={18} className="object-contain md:hidden block w-auto h-auto" priority />
            </Link>
            <h1 className="border-b-2 border-t-2 text-3xl font-shoulders font-bold md:block hidden">Vlads Novels</h1>
         </div>
         {/* Right Side */}
         <div className="flex gap-2 md:mb-1 mb-3">   
            {isAdmin &&
            <Link href={{ pathname: '/admin' }}>
               <Button
                  title={'Admin'}
                  btnType="button"
                  additionalStyles="admin-button"
               />
            </Link>}
            {isUser ? <>
            <Link href={{ pathname: targetPath }}>
               <Button
                  title={targetTitle}
                  btnType="button"
                  additionalStyles="button-profile"
               />
            </Link>
            <Link href={{ pathname: '/auth' }}>
               <Button 
                  title="Sign out" 
                  btnType="button" 
                  additionalStyles="button-logout"
                  action={handleSignOut}
               />
            </Link></> : <>
            <Link href={{ pathname: '/auth', query: { variant: 'login' } }}>
               <Button 
                  title="Sign In" 
                  btnType="button" 
                  additionalStyles="button-login" 
               />
            </Link>
            <Link href={{ pathname: '/auth', query: { variant: 'register' } }}>
               <Button 
                  title="Sign Up" 
                  btnType="button" 
                  additionalStyles="button-register" 
               />
            </Link></>}
         </div>
      </nav>
    </header>
  )
}

export default Navbar