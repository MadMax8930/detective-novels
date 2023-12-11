import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useAdminReports = () => {
   const { data, error, isLoading, mutate } = useSWR('/api/analytics', fetcher);
   return { data, error, isLoading, mutate };
};

export default useAdminReports;