import React from 'react'
import Head from 'next/head'
import { SessionUserProps } from '@/types'
import { Navbar } from '@/components'
import withLoading from '@/pages/_hoc'

type ProfileLayoutProps = {
   children: React.ReactNode;
   layoutMetadata: {
      title?: string;
      description?: string;
      keywords?: string;
      applicationName?: string;
      themeColor?: string;
   };
   session: SessionUserProps;
};

export const metadataProfile = {
   title: 'profile profile profile',
   description: 'profile profile profile',
   keywords: 'profile profile profile',
   applicationName: 'profile profile profile',
   themeColor: "#2d2e30",
}

const ProfileLayout = ({ children, layoutMetadata, session }: ProfileLayoutProps) => {
  return (
    <>
      <Head>
         <meta name="title" content={layoutMetadata?.title} />
         <meta name="description" content={layoutMetadata?.description} />
         <meta name="keywords" content={layoutMetadata?.keywords} />
         <meta name="author" content={layoutMetadata?.applicationName} />
         <meta name="theme-color" content={layoutMetadata?.themeColor} />
      </Head>
      <Navbar isUser={!!session?.email} isAdmin={!!session?.adminId} />
      {children}
   </>
  )
}

export default withLoading(ProfileLayout)