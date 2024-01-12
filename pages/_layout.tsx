import Head from 'next/head'
import type { Metadata } from 'next'

type RootLayoutProps = {
   children: React.ReactNode;
   metadata: Metadata;
};

export default function RootLayout({ children, metadata }: RootLayoutProps){
   const title = metadata?.title?.toString();
   const description = metadata?.description?.toString();
   const keywords = metadata?.keywords?.toString();
   const applicationName = metadata?.applicationName?.toString();
   const themeColor = metadata?.themeColor?.toString();

  return (
   <>
      <Head>
         <title>{title}</title>
         <meta name="title" content={title} />
         <meta name="description" content={description} />
         <meta name="keywords" content={keywords} />
         <meta name="author" content={applicationName} />
         <meta name="theme-color" content={themeColor} />
         <meta name="viewport" content="width=device-width, initial-scale=0.8" />
         <meta httpEquiv="Content-Language" content="ru" />
         <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
         <meta name="robots" content="index, follow" />
         <meta name="publisher" content="Vladislav Surnin" />

         {/* Open Graph Tags */}
         <meta property="og:locale" content="ru_RU" />
         <meta property="og:type" content="book" />
         <meta property="og:title" content={title} />
         <meta property="og:description" content={description} />
         <meta property="og:url" content="https://vladsurnin.com/" />
         <meta property="og:site_name" content="Vlads Novels" />
         <meta property="og:image" content="https://vladsurnin.com/opengraph-image.png" />
         <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
         <link rel="canonical" href="https://vladsurnin.com/" />
         <link rel="preload" href="/images/hero.jpg" as="image" />
      </Head>
      <div className="relative h-screen">
         {children}
      </div>
   </>
  )
}
