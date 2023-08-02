import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import Layout from '@/pages/layout'
import '@/styles/globals.css'

export const metadata = {
   title: 'Vlad Novels',
   description: 'Detective Novels',
   keywords: 'Detective Novels Thrillers Romans',
   applicationName: 'Vladislav',
   themeColor: "#E14773",
}

export default function App({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider session={pageProps.session}>
       <Toaster />
       <Layout metadata={metadata}>
          <Component {...pageProps} />
       </Layout>
    </SessionProvider>
  )
}

