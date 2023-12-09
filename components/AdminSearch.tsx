import React from 'react'
import { MdSearch } from 'react-icons/md'
import { useDebouncedCallback } from 'use-debounce'
import { useAdminNavigation } from '@/hooks/useAdminNavigation'

const AdminSearch = ({ placeholder } : { placeholder: string }) => {
   const { navigateToUrl } = useAdminNavigation();

   const handleSearch = useDebouncedCallback((e) => {
      const searchValue = e.target.value.trim();
      navigateToUrl('1', searchValue.length > 2 ? searchValue : '');
   }, 500);

  return (
    <div className="flex items-center bg-admin-third gap-2.5 p-2.5 rounded-xl w-max">
      <MdSearch />
      <input type="text" placeholder={placeholder} 
         className="bg-transparent text-white-main border-none outline-none" onChange={handleSearch} />
    </div>
  )
}

export default AdminSearch