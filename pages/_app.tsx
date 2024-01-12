import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ProfileProps } from '@/types'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import RootLayout from '@/pages/_layout'
import '@/styles/globals.css'

export const metadata = {
   title: 'Влад Сурнин | Vlad Surnin',
   description: 'Загляните в этот захватывающий мир детективных историй и триллеров, действия которых разворачиваются во Франции конца 90-х годов. Невероятные истории, увлекательные приключения и быстро развивающиеся сюжеты помогут Вам понять реалии того удивительного времени, полного противоречий, недосказанности и парадоксов.',
   keywords: 'vlad surnin, vladsurnin, влад сурнин, владислав сурнин, vladsnovels, vlads novels, детектив, триллер, повесть, жизнь по понятиям, крутые русские, триллеры книги, СССР, эсесовцы, партизаны, Франция, братва, спецслужбы, стрелок, бомж, метро, кладбище, концлагерь, чип, иммигрант, Родина, detective, novels, thrillers, romans, vladislav surnin',
   applicationName: 'Vlad Surnin',
   themeColor: "#2d2e30",
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, props: ProfileProps) => ReactNode
}
 
export default function App({ Component, pageProps }: AppProps & { Component: NextPageWithLayout} ) {
   const getLayout = Component.getLayout ?? ((page) => page)
 
  return getLayout(
    <SessionProvider session={pageProps.session}>
       <Toaster />
       <RootLayout metadata={metadata}>
          <Component {...pageProps} />
       </RootLayout>
    </SessionProvider>, pageProps
  )
}