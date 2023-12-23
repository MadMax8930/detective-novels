import fetcherBis from '@/lib/fetcherBis'

interface newCommBodyProps {
   content: string;
   parentCommentId?: string | null;
}

interface editCommBodyProps {
   content: string;
   parentCommentId?: string | null;
}

const useComment = (commentId?: string) => {

  const addComment = async (newCommentData: newCommBodyProps) => {
    try {
      await fetcherBis(`/api/comment/create`, { method: 'POST', data: newCommentData });
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

  const editComment = async (editedCommentData: editCommBodyProps) => {
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