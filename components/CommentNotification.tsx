import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { FiMessageSquare, FiUser } from 'react-icons/fi'
import { CommentReplyProps } from '@/types';
import { truncate } from '@/lib/truncateContent'
import { NOTIF_MAX_CHARS } from '@/constants'
import useCommentReplies from '@/hooks/useCommentReplies'

const CommentNotification = () => {
   const { data, mutate } = useCommentReplies();
   const [showReplies, setShowReplies] = useState(false);
   const [displayText, setDisplayText] = useState('New message available');

   useEffect(() => {
      if (showReplies) {
        setDisplayText('Replies to my comments');
      } 
   }, [showReplies]);

   const handleOnClick = () => {
      setShowReplies(!showReplies);
      mutate(); 
   };
  
   const replies = data?.replies.slice(0, 4) || [];
   const replyCount = data?.replyCount || 0;
   const displayCount = replyCount > 9 ? '+' : replyCount;

   const shouldRedirect = window.innerWidth < 1150;

  return (
    <>
     {replyCount > 0 && (
      <div className="relative pt-4">
           {shouldRedirect ? (
            <Link href={`/profile/blog/${data?.replies[replies.length - 1].novelId}`}>
               <div className="comment-notif-container">
                  {renderCommonContainer(displayCount)}
               </div>
            </Link>) : (
            <div className="comment-notif-container" onClick={handleOnClick}>
               {renderCommonContainer(displayCount)}
               {showReplies && renderRepliesContainer(replies)}
            </div>)}
      </div>)}
    </>
  );

   function renderCommonContainer(count: string | number) {
      return (
         <div className="comment-notif-common">
            <div className="relative">
               <FiMessageSquare size={30} />
               <div className="comment-notif-circle">{count}</div>
            </div>
            <p>{displayText}</p>
         </div>
      )
   };

   function renderRepliesContainer(replies: CommentReplyProps[]) {
      return (
         <div className="flex flex-col gap-2">
            {replies.map((reply: CommentReplyProps) => (
               <Link href={`/profile/blog/${reply.novelId}`} key={reply.id}>
               <div className="comment-notif-item">
                  <div className="font-shoulders space-x-0.5 flex items-end gap-1">
                     <div className="flex text-sm md:text-base items-center">
                     <FiUser size={15} className="text-base mr-1" />
                     <p className="font-bold">{reply.user.username}</p>
                     </div>
                     <div className="text-xs md:text-sm text-grey">replied to you:</div>
                  </div>
                  <p className="comment-notif-content">{truncate(reply.content, NOTIF_MAX_CHARS)}</p>
               </div>
               </Link>
            ))}
         </div>
      )
   };
};

export default CommentNotification