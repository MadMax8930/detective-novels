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
   title: 'Влад Сурнин | Vlads Novels',
   description: 'Загляните в этот захватывающий мир детективных историй и триллеров, действия которых разворачиваются во Франции конца 90-х годов. Невероятные истории, увлекательные приключения и быстро развивающиеся сюжеты помогут Вам понять реалии того удивительного времени, полного противоречий, недосказанности и парадоксов.',
   keywords: 'vlad surnin, vladsurnin, влад сурнин, владислав сурнин, vladsnovels, детектив, триллер, повесть, жизнь по понятиям, крутые русские, триллеры книги, СССР, эсесовцы, партизаны, Франция, братва, спецслужбы, стрелок, бомж, метро, кладбище, концлагерь, чип, иммигрант, Родина, detective, novels, thrillers, romans, vlads novels, vlad novels, vladislav surnin',
   applicationName: 'Vlad Surnin',
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
         <meta property="og:locale" content="ru_RU" />
         <meta property="og:type" content="website" />
         <meta property="og:title" content={layoutMetadata?.title} />
         <meta property="og:description" content={layoutMetadata?.description} />
         <meta property="og:url" content="https://vladsurnin.com/profile" />
         <meta property="og:site_name" content="Vlad Surnin" />
         <meta property="og:image" content="https://vladsurnin.com/opengraph-image.png" />
         <link rel="canonical" href="https://vladsurnin.com/profile" />
      </Head>
      <Navbar isUser={!!session?.email} isAdmin={!!session?.adminId} />
      {children}
   </>
  )
}

export default withLoading(ProfileLayout)