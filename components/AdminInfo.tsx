import React, { useState, useEffect } from 'react'
import { UserInfoProps, DonationInfoProps } from '@/types'
import useAdminData from '@/hooks/useAdminData'
import { Loader, Button, AdminSearch, AdminPagination } from '@/components'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig();
const { AUTHORIZED_ADMIN_ID } = publicRuntimeConfig;

const AdminInfo = () => {
   const { data, isLoading, error, mutate } = useAdminData(AUTHORIZED_ADMIN_ID);
   const [donoBtn, setDonoBtn] = useState(true);

   useEffect(() => {
      if (data) { mutate();}
   }, [data, mutate]);
   
   if (isLoading) { return <Loader /> }
   if (error) { return <p className="text-center pb-4">Error loading admin data.</p> }

   // const searchQuery = searchParams?.q || "";
   // const pageQuery = searchParams?.p || 1;
   // const { count, users } = await fetchUsers(searchQuery, pageQuery);

   return (
      <div className="flex flex-col items-center gap-4 my-4 py-4 px-4 sm:px-12 md:px-24 lg:px-36 mt-10 bg-admin-outer">

         <div className="w-full mb-12 overflow-x-auto bg-admin-inner rounded-xl p-8 border border-admin-third">
            <div className="flex items-center justify-between">
               <AdminSearch placeholder={donoBtn ? "Search for a user..." : "Search for a dono..."}/>
               <Button
                  title={donoBtn ? 'Donations' : 'Users'}
                  btnType="button"
                  additionalStyles="bg-admin-btn text-white-main font-semibold p-2.5 outline-none rounded-md"
                  action={() => setDonoBtn(!donoBtn)}
               />  
            </div>
            <table className="table w-full mt-5">
               <thead className="text-white-main">
                  {donoBtn
                  ?
                  <tr>
                     <th className="p-2 w-[35%] text-start">Username</th>
                     <th className="p-2 w-[17.5%] text-start">Email</th>
                     <th className="p-2 w-[17.5%] text-start">Created At</th>
                     <th className="p-2 w-[30%] text-start">User Identifier</th>
                  </tr>
                  :
                  <tr className="bg-admin-btn text-white-main uppercase">
                     <th className="p-2 w-[20%] text-start">Amount</th>
                     <th className="p-2 w-[15%] text-start">Donator</th>
                     <th className="p-2 w-[17.5%] text-start">Logged in as</th>
                     <th className="p-2 w-[17.5%] text-start">Created At</th>
                     <th className="p-2 w-[30%] text-start">Message</th>
                  </tr>}
               </thead>

               <tbody className='m-4'>
                  {donoBtn 
                  ? <>
                  {data.users.map((user: UserInfoProps) => (
                     <tr key={user.id} className="bg-transparent text-white-main">
                        <td className="table-cell">{user.username}</td>
                        <td className="table-cell">{user.email}</td>
                        <td className="table-cell">{new Date(user.createdAt).toLocaleString()}</td>
                        <td className="identifier-cell">{user.id}</td>
                     </tr>
                  ))} </>
                  : <>
                  {data.donations.map((donation: DonationInfoProps) => (
                     <tr key={donation.id} className="bg-transparent">
                        <td className="amount-cell">{donation.amount}</td>
                        <td className="table-cell">{donation.donator || '<anonymous>'}</td>
                        <td className="table-cell">{donation.user.email}</td>
                        <td className="table-cell">{new Date(donation.createdAt).toLocaleString()}</td>
                        <td className="table-cell">{donation.message || '<no message>'}</td>
                     </tr>
                  ))} </>}
               </tbody>
            </table>
            <AdminPagination totalItems={donoBtn ? data.users.length : data.donations.length} />
         </div>
      </div>
   );

}

export default AdminInfo