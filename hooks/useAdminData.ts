import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { AdminDataParams } from '@/types'

const useAdminData = ({ adminId, query, portion }: AdminDataParams = {}) => {
   let endpoint = `/api/admin?adminId=${adminId}`;
   if (query) endpoint += `&query=${query}`;
   if (portion) endpoint += `&portion=${portion}`;

   const { data, error, isLoading, mutate } = useSWR(adminId ? endpoint : null, fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
   });

   return { data, error, isLoading, mutate };
}

export default useAdminData;