import React, { useEffect } from 'react'
import useAdminData from '@/hooks/useAdminData';
import { Loader } from '@/components'
import { UserInfoProps, DonationInfoProps } from '@/types';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { AUTHORIZED_ADMIN_ID } = publicRuntimeConfig;

const UsersInfo = () => {
   const { data, isLoading, error, mutate } = useAdminData(AUTHORIZED_ADMIN_ID);

   useEffect(() => {
      if (data) {
         mutate();
      }
   }, [data, mutate]);
   
   if (isLoading) { return <Loader /> }
   if (error) { return <p className="text-center pb-4">Error loading admin data.</p> }

   return (
      <div className="flex flex-col text-center">
         <div className="text-black">AdminId: {data?.admin}</div>
         <div>
            <h2>Users:</h2>
            <ul>
               {data.users.map((user: UserInfoProps ) => (
                  <li key={user.id}>{user.username} - {user.email} Created at: {new Date(user.createdAt).toLocaleString()}</li>
               ))}
            </ul>
         </div>
         <div>
            <h2>Donations:</h2>
            <ul>
               {data.donations.map((donation: DonationInfoProps) => (
                  <li key={donation.id}>{donation.donator} - {donation.message} - Created at: {new Date(donation.createdAt).toLocaleString()}</li>
               ))}
            </ul>
         </div>
      </div>
   )
}

export default UsersInfo