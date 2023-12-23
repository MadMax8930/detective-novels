import React from 'react'
import { Button } from '@/components'
import { BiSolidMessageDetail, BiSolidMessageEdit, BiSolidTrash } from 'react-icons/bi'
import { format } from '@/lib/dateFormat'
import { toast } from 'react-hot-toast'
import { CommentCardProps } from '@/types'
import useComment from '@/hooks/useComment'

const CommentCard: React.FC<CommentCardProps> = ({ comment, commentId, mutate, onReply, onEdit, authUser, buttonSelection }) => {
   const { handleCommentClick, isSelected, btnAction } = buttonSelection;
   const { deleteComment } = useComment(commentId);

   const handleCommentDeletion = async () => {
      try {
         await deleteComment();
         toast.success('Comment deleted successfully');
         mutate();
      } catch (error) {
         console.error('Error deleting the comment:', error);
         toast.error(`Error: ${error}`) 
      }
   };

   const handleReply = () => {
      onReply(comment);
      handleCommentClick(comment.id, 'reply');
   };
  
   const handleEdit = () => {
      onEdit(comment);
      handleCommentClick(comment.id, 'edit');
   };
  
   const handleDelete = () => {
      handleCommentDeletion();
   };

  return (
    <div className="comment-card-container">
      {/* Comment */}
      <div className="comment-card-profile">
         <p className="comment-card-user">{comment.user?.username}</p>
         <p className="comment-card-date">{format(comment.createdAt)}</p>
      </div>
      <div className="comment-card-content prose lg:prose-xl">
         {comment.content}
      </div>
      {/* Controls */}
      <div className="comment-card-buttons">
         <Button action={handleReply} rightIcon={<BiSolidMessageDetail size={24} />} tooltip="Reply to comment" additionalStyles={`button-comment-reply ${isSelected && btnAction === 'reply' ? 'bg-btn-comment-100' : 'bg-btn-comment'}`} />
         {comment.userId === authUser && (
         <Button action={handleEdit} rightIcon={<BiSolidMessageEdit size={24} />} tooltip="Edit your comment" additionalStyles={`button-comment-edit ${isSelected && btnAction === 'edit' ? 'bg-btn-comment-200' : 'bg-btn-comment'}`} />)}
         {comment.userId === authUser && (
         <Button action={handleDelete} rightIcon={<BiSolidTrash size={24} />} tooltip="Delete your comment" additionalStyles='button-comment-delete bg-btn-comment' />)}
      </div>
      {/* Parent */}
      {comment.parentCommentId && (<>
      <div className="comment-card-reply">
         <span className="comment-card-replier">Replied to: <strong>{comment.parentCommentObj?.user.username}</strong></span>
         <p className="comment-card-replied">{comment.parentCommentObj?.content}</p>
      </div></>)}
    </div>
  )
}

export default CommentCard