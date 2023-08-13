import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useNovel = (id?: string) => {
   const { data, error, isLoading, mutate } = useSWR(id ? `/api/novels/${id}` : null, fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
   });

   return { data, error, isLoading, mutate };
}

export default useNovel;