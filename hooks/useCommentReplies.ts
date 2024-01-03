import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useCommentReplies = () => {
   const { data, error, isLoading, mutate } = useSWR(`/api/comment/replies`, fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
   });

   return { data, error, isLoading, mutate };
};

export default useCommentReplies;