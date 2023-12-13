import { Navbar } from '@/components';
import React from 'react'

type ProfileLayoutProps = {
   children: React.ReactNode;
};

export default function ProfileLayout ({ children }: ProfileLayoutProps){
  return (
    <div>
      <Navbar />
      <div className='h-32 bg-red-500 z-10000000 fixed'>
      {children}</div>
      <div className='h-32 bg-red-500 z-10000000 fixed'></div>
   </div>
  )
}