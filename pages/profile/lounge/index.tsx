import React from 'react'
import { Toggler, LoaderLight, FavoriteLibrary } from '@/components'
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
    <div className='pt-32'>
      <FavoriteLibrary />
      <div className='absolute bottom-0 left-10 w-full p-4'>
        Connected as: {session.username}
        <Toggler isSubscribed={user?.receiveNewsletters} />
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