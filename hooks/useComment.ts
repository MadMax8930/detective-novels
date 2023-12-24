import fetcherBis from '@/lib/fetcherBis'
import { CommBodyProps } from '@/types'

const useComment = (novelId?: string, commentId?: string) => {

  const addComment = async (newCommentData: CommBodyProps) => {
    try {
      await fetcherBis(`/api/comment/create?novelId=${novelId}`, { method: 'POST', data: newCommentData });
    } catch (error) {
      throw error;
    }
  };

  const getComment = async () => {
    try {
      await fetcherBis(`/api/comment?commentId=${commentId}`, { method: 'GET'});
    } catch (error) {
      throw error;
    }
  };

  const editComment = async (editedCommentData: CommBodyProps) => {
    try {
      await fetcherBis(`/api/comment/update?commentId=${commentId}`, { method: 'PUT', data: editedCommentData });
    } catch (error) {
      throw error;
    }
  };

  const deleteComment = async () => {
    try {
      await fetcherBis(`/api/comment/delete?commentId=${commentId}`, { method: 'DELETE' });
    } catch (error) {
      throw error;
    }
  };

  return {
    addComment,
    getComment,
    editComment,
    deleteComment,
  };
};

export default useComment