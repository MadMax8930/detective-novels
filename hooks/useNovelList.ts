import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useNovelList = () => {
   const { data, error, isLoading } = useSWR('/api/novels', fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
   });

   return { data, error, isLoading };
};

export default useNovelList;