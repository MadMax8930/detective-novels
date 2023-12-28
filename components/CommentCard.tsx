import React, { useState } from 'react'
import { Button } from '@/components'
import { BiSolidMessageDetail, BiSolidMessageEdit, BiSolidCommentX, BiSolidCheckSquare, BiSolidXSquare, BiSolidCommentError } from 'react-icons/bi'
import { format } from '@/lib/dateFormat'
import { toast } from 'react-hot-toast'
import { CommentCardProps } from '@/types'
import useComment from '@/hooks/useComment'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig();
const { AUTHORIZED_ADMIN_ID } = publicRuntimeConfig;

const CommentCard: React.FC<CommentCardProps> = ({ comment, commentId, mutate, onReply, onEdit, authUser, authAdmin, buttonSelection }) => {
   const { handleCommentClick, isSelected, btnAction } = buttonSelection;
   const { deleteComment } = useComment(undefined, commentId);
   const [isConfirmationOpen, setConfirmationOpen] = useState(false);

   const handleCommentDeletion = async () => {
      try {
         await deleteComment();
         toast.success('Comment deleted successfully');
         mutate();
         setConfirmationOpen(false);
      } catch (error) {
         console.error('Error deleting the comment:', error);
         toast.error('An unexpected error occurred'); 
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
      setConfirmationOpen(true);
   };
  
    const cancelDeletion = () => {
      setConfirmationOpen(false);
   };
  
   const confirmDeletion = () => {
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
         {isConfirmationOpen ? (<>
            <Button action={confirmDeletion} rightIcon={<BiSolidCheckSquare size={24} />} tooltip="Confirm deletion" additionalStyles='button-comment-reply bg-btn-comment bg-green-600' />
            <Button action={cancelDeletion} rightIcon={<BiSolidXSquare size={24} />} tooltip="Cancel deletion" additionalStyles='button-comment-delete bg-btn-comment bg-red-600' />
         </>) : (<>
            <Button action={handleReply} rightIcon={<BiSolidMessageDetail size={24} />} tooltip="Reply to comment" additionalStyles={`button-comment-reply ${isSelected && btnAction === 'reply' ? 'bg-btn-comment-100' : 'bg-btn-comment'}`} />
            {comment.userId === authUser && (
            <Button action={handleEdit} rightIcon={<BiSolidMessageEdit size={24} />} tooltip="Edit your comment" additionalStyles={`button-comment-edit ${isSelected && btnAction === 'edit' ? 'bg-btn-comment-200' : 'bg-btn-comment'}`} />)}
            {comment.userId === authUser && (
            <Button action={handleDelete} rightIcon={<BiSolidCommentX size={24} />} tooltip="Delete your comment" additionalStyles='button-comment-delete bg-btn-comment' />)}
            {authAdmin && authAdmin === AUTHORIZED_ADMIN_ID && comment.userId !== authUser && (
            <Button action={handleDelete} rightIcon={<BiSolidCommentError size={24} />} tooltip={`Delete ${comment.user?.username || 'user'}'s comment`} additionalStyles='button-comment-delete-for-admin bg-btn-comment' />)}
         </>)}     
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