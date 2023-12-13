import React from 'react'
import Head from 'next/head'
import { SessionUserProps } from '@/types'
import { Navbar } from '@/components'

type ProfileLayoutProps = {
   children: React.ReactNode;
   layoutMetadata: {
      title: string;
      description: string;
      keywords: string;
      applicationName: string;
      themeColor: string;
   };
   session: SessionUserProps;
};

export const metadataProfile = {
   title: 'testing the title seo',
   description: 'testing the desc seo',
   keywords: 'testing the keywords seo',
   applicationName: 'testing the author seo',
   themeColor: "#2d2e30",
}


export default function ProfileLayout ({ children, layoutMetadata, session }: ProfileLayoutProps) {
  return (
    <>
      <Head>
         <meta name="title" content={layoutMetadata.title} />
         <meta name="description" content={layoutMetadata.description} />
         <meta name="keywords" content={layoutMetadata.keywords} />
         <meta name="author" content={layoutMetadata.applicationName} />
         <meta name="theme-color" content={layoutMetadata.themeColor} />
      </Head>
      <Navbar isUser={!!session?.email} isAdmin={!!session?.adminId} />
      {children}
   </>
  )
}