import React, { useEffect } from 'react'
import { Button } from '@/components'
import { BiSolidMessageDetail, BiSolidMessageEdit, BiSolidEnvelope, BiSolidCommentX } from 'react-icons/bi'
import { CommentPromptProps } from '@/types'
import { toast } from 'react-hot-toast'
import useComment from '@/hooks/useComment'

const CommentPrompt: React.FC<CommentPromptProps> = ({ novel, mutate, replyingComment, setReplyingComment, editingComment, setEditingComment, cancelSend, authUser, messageBody, setMessageBody, parentMessageId, setParentMessageId, buttonSelection }) => {
   const { btnAction, selectedCommentId, handleCommentClick } = buttonSelection;
   const { addComment, editComment } = useComment(editingComment?.id);
   const { addComment: replyComment } = useComment(replyingComment?.id);
   
   useEffect(() => {
     if (replyingComment) {   
        setEditingComment(null);
        setParentMessageId(replyingComment.id);
     }
   }, [replyingComment, setEditingComment, setParentMessageId]);

   useEffect(() => {
      if (editingComment) {
         setReplyingComment(null);
         setParentMessageId(editingComment.parentCommentId);
         setMessageBody(editingComment.content);
      }
   }, [editingComment, setReplyingComment, setParentMessageId, setMessageBody]);

   const handleSend = async () => {
      try {
         if (!messageBody.trim()) {
            toast.error('Comment cannot be empty');
            return;
         }
         const commData: any = { 
            content: messageBody, 
            ...(parentMessageId && { parentCommentId: parentMessageId }),
         }
         if (replyingComment) {
            await replyComment(commData);
            toast.success('Comment replied successfully');
         } else if (editingComment) {
            await editComment(commData);
            toast.success('Comment updated successfully');
         } else {
            setParentMessageId(null)
            await addComment(commData);
            toast.success('Comment posted successfully');
         }
         handleCommentClick(null, null);
         setEditingComment(null);
         setReplyingComment(null);
         setParentMessageId(null);
         setMessageBody('');
         mutate();
      } catch (error) {
         console.error('Error sending the comment:', error);
         toast.error(`Error: You need to be logged in.`)
      }
   };

  return (
    <div className="sticky">
      {(selectedCommentId && btnAction === 'reply') 
         ? <p className="comment-info-container" style={{ backgroundColor: '#16a34a' }}>{btnAction} - {selectedCommentId}</p>
         : (selectedCommentId && btnAction === 'edit') 
         ? <p className="comment-info-container" style={{ backgroundColor: '#eab308' }}>{btnAction} - {selectedCommentId}</p> 
         : null
      }
      <div className="comment-prompt-container">
         <div className="w-full bg-[rgba(246, 240, 240, 0.841)]">
            <input className="comment-prompt-input" placeholder={`💬  ${novel.title} ...`}
               value={messageBody} onChange={(e) => setMessageBody(e.target.value)}/></div>
         <div className="comment-prompt-buttons">
            <img className="comment-novel-container" src={novel.coverImage} alt="Novel Id Image" />
            {replyingComment && (
               <>
                 <Button action={handleSend} rightIcon={<BiSolidMessageDetail sizes={24} />} tooltip='Reply to comment' additionalStyles={`button-comment-reply ${selectedCommentId && btnAction === 'reply' ? 'bg-btn-comment-100' : 'bg-btn-comment'}`} />
                 <Button action={cancelSend} rightIcon={<BiSolidCommentX sizes={24} />} tooltip="Cancel reply" additionalStyles={`button-comment-delete ${selectedCommentId && btnAction === 'reply' ? 'bg-btn-comment-300' : 'bg-btn-comment'}`} />
               </>
            )}
            {editingComment && (
               <>
                 <Button action={handleSend} rightIcon={<BiSolidMessageEdit sizes={24} />} tooltip='Update your comment' additionalStyles={`button-comment-edit ${selectedCommentId && btnAction === 'edit' ? 'bg-btn-comment-200' : 'bg-btn-comment'}`} />
                 <Button action={cancelSend} rightIcon={<BiSolidCommentX sizes={24} />} tooltip="Cancel edit" additionalStyles={`button-comment-delete ${selectedCommentId && btnAction === 'edit' ? 'bg-btn-comment-300' : 'bg-btn-comment'}`} />
               </>
            )}
            {authUser && (
               <>
                 <Button action={handleSend} rightIcon={<BiSolidEnvelope sizes={24} />} tooltip='Post new comment' additionalStyles={`button-comment-post ${selectedCommentId ? 'bg-btn-comment' : 'bg-primary-blue'}`} />
               </>
            )}
         </div>
      </div>
    </div>
  )
}

export default CommentPrompt