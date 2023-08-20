import React, { useEffect } from 'react'
import { UserInfoProps, DonationInfoProps } from '@/types';
import useAdminData from '@/hooks/useAdminData';
import { Loader } from '@/components'
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
      <div className="flex flex-col items-center gap-4 my-4 py-4 px-4 sm:px-12 md:px-24 lg:px-36">

         <div className="w-full mb-12 overflow-x-auto">
            <h2 className="text-start font-bold italic mb-2">Users:</h2>
            <table className="table w-full">
               <thead>
                  <tr className="bg-blue-200">
                     <th className="p-2 w-[35%] text-start">Username</th>
                     <th className="p-2 w-[17.5%] text-start">Email</th>
                     <th className="p-2 w-[17.5%] text-start">Created At</th>
                     <th className="p-2 w-[30%] text-start">User Identifier</th>
                  </tr>
               </thead>
               <tbody>
                  {data.users.map((user: UserInfoProps) => (
                     <tr key={user.id}>
                        <td className="table-cell">{user.username}</td>
                        <td className="table-cell">{user.email}</td>
                        <td className="table-cell">{new Date(user.createdAt).toLocaleString()}</td>
                        <td className="identifier-cell">{user.id}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="w-full mb-12 overflow-x-auto">
            <h2 className="text-start font-bold italic mb-2 ">Donations:</h2>
            <table className="table w-full">
               <thead>
                  <tr className="bg-green-200">
                     <th className="p-2 w-[22.5%] text-start">Amount</th>
                     <th className="p-2 w-[12.5%] text-start">Donator</th>
                     <th className="p-2 w-[17.5%] text-start">Logged in as</th>
                     <th className="p-2 w-[17.5%] text-start">Created At</th>
                     <th className="p-2 w-[30%] text-start">Message</th>
                  </tr>
               </thead>
               <tbody>
                  {data.donations.map((donation: DonationInfoProps) => (
                     <tr key={donation.id}>
                        <td className="amount-cell">{donation.amount}</td>
                        <td className="table-cell">{donation.donator || '<anonymous>'}</td>
                        <td className="table-cell">{donation.user.email}</td>
                        <td className="table-cell">{new Date(donation.createdAt).toLocaleString()}</td>
                        <td className="table-cell">{donation.message || '<no message>'}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );

}

export default UsersInfo