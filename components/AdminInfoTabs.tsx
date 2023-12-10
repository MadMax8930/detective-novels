import React, { useState, useEffect } from 'react'
import { UserInfoProps, DonationInfoProps } from '@/types'
import { useSearchParams } from 'next/navigation'
import { useAdminNavigation } from '@/hooks/useAdminNavigation'
import { Button, AdminSearch, AdminPagination, AdminLoader, AdminError } from '@/components'
import { ITEMS_PER_PAGE } from '@/constants'
import { MdRefresh } from 'react-icons/md'
import useAdminData from '@/hooks/useAdminData'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig();
const { AUTHORIZED_ADMIN_ID } = publicRuntimeConfig;

const AdminInfoTabs = () => {
   const { navigateToUrl } = useAdminNavigation();

   const searchParams = useSearchParams();
   const userQuery = searchParams.get("query") || ''
   const pageQuery = searchParams.get("portion") || "1";   
   
   const { data, isLoading, error, mutate } = useAdminData({
      adminId: AUTHORIZED_ADMIN_ID, query: userQuery, portion: pageQuery
   });

   const [btnUserType, setBtnUserType] = useState(true);
   const totalItems = btnUserType ? data?.usersCount : data?.donationsCount;

   useEffect(() => {
      if (data) { mutate(); }

      const isValidPositiveInteger = /^[1-9]\d*$/.test(pageQuery);
   
      if (isValidPositiveInteger) {
         const currentPage = parseInt(pageQuery);
         const maxValidPage = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
         if (currentPage > maxValidPage) { navigateToUrl(maxValidPage.toString()); }
      } else {
         navigateToUrl('1');
      }
   }, [data, mutate, setBtnUserType, pageQuery, navigateToUrl, totalItems]);

   
   return (
      <div className="admin-table-container">
         {isLoading ? <AdminLoader /> : error ? <AdminError /> : <>
         <div className="admin-card">
            <div className="flex items-center justify-between">
               <AdminSearch placeholder={btnUserType ? "Search for a user..." : "Search for a dono..."}/>
               <Button
                  title={btnUserType ? 'Donations' : 'Users'}
                  btnType="button"
                  additionalStyles="admin-button"
                  action={() => setBtnUserType(!btnUserType)}
               />  
            </div>
            <table className="w-full mt-5 border-collapse">
               <thead className="text-white-main">
                  {btnUserType
                  ?
                  <tr className="table-header">
                     <th className="table-cell">Username</th>
                     <th className="table-cell">Email</th>
                     <th className="table-cell">Created At</th>
                     <th className="table-cell">User Identifier</th>
                  </tr>
                  :
                  <tr className="table-header">
                     <th className="table-cell">Amount</th>
                     <th className="table-cell">Donator</th>
                     <th className="table-cell">Email</th>
                     <th className="table-cell">Created At</th>
                     <th className="table-cell">Message</th>
                  </tr>}
               </thead>
               <tbody>
                  {data?.users.length > 0 || data?.donations.length > 0 ? (
                     btnUserType ? <>
                        {data?.users.map((user: UserInfoProps) => (
                           <tr key={user.id} className="table-content">
                              <td className="table-cell">{user.username}</td>
                              <td className="table-cell">{user.email}</td>
                              <td className="table-cell">{new Date(user.createdAt).toLocaleString()}</td>
                              <td className="table-cell table-cell-identifier">{user.id}</td>
                           </tr>
                        ))}</> : <>
                        {data?.donations.map((donation: DonationInfoProps) => (
                           <tr key={donation.id} className="table-content">
                              <td className="table-cell table-cell-amount">{donation.amount}</td>
                              <td className="table-cell">{donation.donator || '<anonymous>'}</td>
                              <td className="table-cell">{donation.user.email}</td>
                              <td className="table-cell">{new Date(donation.createdAt).toLocaleString()}</td>
                              <td className="table-cell">{donation.message || '<no message>'}</td>
                           </tr>
                        ))}</>
                  ) : (
                     <tr className="table-content">
                        <td className="table-cell-err" colSpan={1}>
                          {error ? "An error occurred." : "None found."}
                          <button className="table-refresh-icon" onClick={() => { navigateToUrl('1'); }}>
                              <MdRefresh />
                          </button>
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
            <AdminPagination totalItems={totalItems} pageQuery={pageQuery} />
         </div></>}
      </div>
   );

}

export default AdminInfoTabs