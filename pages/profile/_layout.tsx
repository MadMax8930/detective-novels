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
         <title>{layoutMetadata?.title}</title>
         <meta name="title" content={layoutMetadata?.title} />
         <meta name="description" content={layoutMetadata?.description} />
         <meta name="keywords" content={layoutMetadata?.keywords} />
         <meta name="author" content={layoutMetadata?.applicationName} />
         <meta name="theme-color" content={layoutMetadata?.themeColor} />
         <meta name="viewport" content="width=device-width, initial-scale=0.8" />
         <meta httpEquiv="Content-Language" content="ru" />
         <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
         <meta name="robots" content="index, follow" />
         <meta name="publisher" content="Vladislav Surnin" />

         {/* Open Graph Tags */}
         <meta property="og:title" content={layoutMetadata?.title} />
         <meta property="og:description" content={layoutMetadata?.description} />
         <meta property="og:type" content="website" />
         <meta property="og:image" content="/images/logo.png" />
         <meta property="og:url" content="https://vladsurnin.com/" />
      </Head>
      <Navbar isUser={!!session?.email} isAdmin={!!session?.adminId} />
      {children}
   </>
  )
}

export default withLoading(ProfileLayout)