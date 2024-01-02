import React from 'react'
import { LoaderRound,  NoItem, CommentCard, CommentPrompt } from '@/components'
import { CommentListSectionProps } from '@/types'

const CommentListSection: React.FC<CommentListSectionProps> = ({ comments, loading, mutate, onReply, onEdit, authUser, authAdmin, buttonSelection, novel, novelId, replyingComment, setReplyingComment, editingComment, setEditingComment, cancelSend, messageBody, setMessageBody, parentMessageId, setParentMessageId }) => {

   if (loading) { return <LoaderRound /> }
   if (!comments || comments.length === 0) { return <NoItem variation={'nc'} linkHref="/profile/lounge" title="No comments found" description="Be the first one to share your thoughts." imageSrc="/images/nocoms.png" imageAlt="No Comments" /> }

  return (
    <div className="comment-list-container">
       {comments.map((comment) => (
         <React.Fragment key={comment.id}>
            <CommentCard
               comment={comment}
               mutate={mutate} 
               onReply={onReply}
               onEdit={onEdit}
               commentId={comment.id} 
               authUser={authUser}
               authAdmin={authAdmin}
               buttonSelection={{
                  handleCommentClick: buttonSelection.handleCommentClick,
                  isSelected: buttonSelection.selectedCommentId === comment.id,
                  btnAction: buttonSelection.btnAction,
               }} />
            {((buttonSelection.selectedCommentId === comment.id && replyingComment) || 
            (buttonSelection.selectedCommentId === comment.id && editingComment)) ?
            <CommentPrompt
               novel={novel}
               novelId={novelId}
               mutate={mutate} 
               replyingComment={replyingComment}
               setReplyingComment={setReplyingComment}
               editingComment={editingComment} 
               setEditingComment={setEditingComment}
               cancelSend={cancelSend}
               messageBody={messageBody}
               setMessageBody={setMessageBody}
               parentMessageId={parentMessageId}
               setParentMessageId={setParentMessageId}
               buttonSelection={{
                  handleCommentClick: buttonSelection.handleCommentClick,
                  selectedCommentId: buttonSelection.selectedCommentId,
                  btnAction: buttonSelection.btnAction,
               }} /> : null}
         </React.Fragment>
       ))}
    </div>
  )
}

export default CommentListSection