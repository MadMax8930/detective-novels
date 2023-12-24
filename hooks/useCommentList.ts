import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useCommentList = (novelId: string) => {
   const { data, error, isLoading, mutate } = useSWR(`/api/comment/listAll?novelId=${novelId}`, fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
   });

   return { data, error, isLoading, mutate };
};

export default useCommentList;