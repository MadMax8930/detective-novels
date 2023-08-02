import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useNovel = (id?: string) => {
   const { data, error, isLoading } = useSWR(id ? `/api/novels/${id}` : null, fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
   });

   return { data, error, isLoading };
}

export default useNovel;