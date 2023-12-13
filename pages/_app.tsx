import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import RootLayout from '@/pages/_layout'
import '@/styles/globals.css'

export const metadata = {
   title: 'Vlad Novels',
   description: 'Detective Novels',
   keywords: 'Detective Novels Thrillers Romans',
   applicationName: 'Vladislav Surnin',
   themeColor: "#2d2e30",
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
export default function App({ Component, pageProps }: AppProps & { Component: NextPageWithLayout} ) {
   const getLayout = Component.getLayout ?? ((page) => page)
 
  return getLayout(
    <SessionProvider session={pageProps.session}>
       <Toaster />
       <RootLayout metadata={metadata}>
          <Component {...pageProps} />
       </RootLayout>
    </SessionProvider>
  )
}