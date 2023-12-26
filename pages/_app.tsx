import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ProfileProps } from '@/types'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import RootLayout from '@/pages/_layout'
import '@/styles/globals.css'

export const metadata = {
   title: 'Vlads Novels',
   description: 'Загляните в этот захватывающий мир детективных историй и триллеров, действия которых разворачиваются во Франции конца 90-х годов. Невероятные истории, увлекательные приключения и быстро развивающиеся сюжеты помогут Вам понять реалии того удивительного времени, полного противоречий, недосказанности и парадоксов.',
   keywords: 'влад сурнин, крутые русские, триллер, повесть, долг, честь, жизнь по понятиям, триллеры книги, ссср, равнодушие, эсесовцы, партизаны, концентрационный лагерь, глушитель, граната, франк, Франция, доллар, акцент, чётки, кедр, еврей, братва, брассери, стрелок, бомж, бродяга, метро, кладбище, концлагерь, чип, Кольт, африканец, ресторан, Родина, detective, novels, thrillers, romans, vladsurnin, vlad surnin, vladislav surnin',
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