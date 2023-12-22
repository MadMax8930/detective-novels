import React from 'react'
import { Toggler, LoaderLight, FavoriteLibrary, Footer } from '@/components'
import { getUserSessionServerSideProps } from '@/lib/sessionProps'
import useCurrentUser from '@/hooks/useCurrentUser'

import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'
import { ProfileProps } from '@/types'
import { metadata } from '@/pages/_app'
import RootLayout from '@/pages/_layout'
import ProfileLayout, { metadataProfile } from '../_layout'

// Protecting routes by fetching user session on client side
export const getServerSideProps = getUserSessionServerSideProps;

const Lounge: NextPageWithLayout<ProfileProps> = ({ session }) => {
   const { data: user, isLoading: loadUser } = useCurrentUser();
   if (loadUser) { return <LoaderLight /> } 

  return (
    <div className='flex flex-col gap-6 sm:px-12 px-4 py-4 md:px-24 lg:px-36 h-full pt-24'>

      <div className="newsletter-container">
         <p className="newsletter-main">
            Would you like to receive newsletters ? 
            <Toggler isSubscribed={user?.receiveNewsletters} />
         </p>
         <p className="newsletter-sub">
            Sent by the author to&nbsp;{session.email}
         </p>
      </div>

      <div className="favorite-container">
         <FavoriteLibrary />
      </div>

    </div>
  )
}

Lounge.getLayout = function getLayout(page: ReactElement, props: ProfileProps) {
   return (
      <RootLayout metadata={metadata}>
         <ProfileLayout layoutMetadata={metadataProfile || metadata} session={props.session}>{page}</ProfileLayout>
      </RootLayout>
   )
}

export default Lounge