import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useAdminData = (adminId?: string) => {
   const { data, error, isLoading, mutate } = useSWR(adminId ? `/api/admin?adminId=${adminId}` : null, fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
   });

   return { data, error, isLoading, mutate };
}

export default useAdminData;