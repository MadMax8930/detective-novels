import React, { useState } from 'react'
import { Button } from '@/components'
import { BiSolidEnvelope } from 'react-icons/bi'
import { CommentSenderProps } from '@/types'
import { toast } from 'react-hot-toast'
import useComment from '@/hooks/useComment'

const CommentSender: React.FC<CommentSenderProps> = ({ novelId, novel, mutate }) => {
   const { addComment: addComment } = useComment(novelId, undefined);
   const [messageBody, setMessageBody] = useState('');

   const handleSend = async () => {
      try {
         if (!messageBody.trim()) {
            toast.error('Comment cannot be empty');
            return;
         }
         const commData: any = { 
            content: messageBody,
         }
         await addComment(commData);
         toast.success('Comment posted successfully');
         setMessageBody('');
         mutate();
      } catch (error) {
         console.error('Error sending the comment:', error);
         toast.error(`Error: You need to be logged in.`)
      }
   };

  return (
    <div className="comment-prompt-container">
      <div className="comment-prompt-input">
         <textarea id="comment" name="comment" className="comment-textarea" 
            placeholder={`💬 - What did you think of ❞ ${novel.title}❞ ? ...`} rows={6}
            value={messageBody} onChange={(e) => setMessageBody(e.target.value)} />
      </div>
      <div className="comment-prompt-buttons">
         <Button action={handleSend} rightIcon={<BiSolidEnvelope size={24} />} tooltip='Post new comment' additionalStyles="button-comment-post" />
      </div>
    </div>
  )
}

export default CommentSender