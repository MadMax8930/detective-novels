import React from 'react'
import { MdSearch } from 'react-icons/md'
import { useDebouncedCallback } from 'use-debounce'
import { useAdminNavigation } from '@/hooks/useAdminNavigation'

const AdminSearch = ({ placeholder } : { placeholder: string }) => {
   const { navigateToUrl } = useAdminNavigation();

   const handleSearch = useDebouncedCallback((e) => {
      const searchValue = e.target.value.trim();
      navigateToUrl('1', searchValue.length > 2 ? searchValue : '');
   }, 750);

  return (
    <div className="admin-search-container">
      <MdSearch /><input type="text" placeholder={placeholder} onChange={handleSearch} className="admin-search-input" />
    </div>
  )
}

export default AdminSearch