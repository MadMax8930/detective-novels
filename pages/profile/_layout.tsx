import { Navbar } from '@/components';
import React from 'react'

type ProfileLayoutProps = {
   children: React.ReactNode;
};

export default function ProfileLayout ({ children }: ProfileLayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
   </div>
  )
}