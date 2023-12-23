import React from 'react'
import { LoaderRound,  NoItem, CommentCard } from '@/components'
import { CommentListProps } from '@/types'

const CommentList: React.FC<CommentListProps> = ({ novelId, comments, loading, mutate, onReply, onEdit, authUser, buttonSelection }) => {

   if (loading) { return <LoaderRound /> }
   if (!comments || comments.length === 0) { return <NoItem variation={'nc'} linkHref="/profile/lounge" title="No comments found" description="Be the first one to share your thoughts." imageSrc="/images/nocoms.png" imageAlt="No Comments" /> }

  return (
    <div className="comment-list-container">
       {comments.map((comment) => (
          <CommentCard key={comment.id} 
             novelId={novelId} 
             comment={comment}
             mutate={mutate} 
             onReply={onReply}
             onEdit={onEdit}
             commentId={comment.id} 
             authUser={authUser}
             buttonSelection={{
               handleCommentClick: buttonSelection.handleCommentClick,
               isSelected: buttonSelection.selectedCommentId === comment.id,
               btnAction: buttonSelection.btnAction,
             }} />
       ))}
    </div>
  )
}

export default CommentList