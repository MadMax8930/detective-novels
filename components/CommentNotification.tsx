import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { FiMessageSquare, FiUser } from 'react-icons/fi'
import useCommentReplies from '@/hooks/useCommentReplies'
import { CommentReplyProps } from '@/types';


const CommentNotification = () => {
   const { data, error, isLoading, mutate } = useCommentReplies();
   const [isRead, setIsRead] = useState(false);
   const [showReplies, setShowReplies] = useState(false);
   const [displayText, setDisplayText] = useState('New message available');
   const [localReplyCount, setLocalReplyCount] = useState<number>(0);

   useEffect(() => {
     const storedCount = parseInt(localStorage.getItem('commentNotifCount') || '0', 10);
     setLocalReplyCount(storedCount);
   }, []);

   useEffect(() => {
      if (showReplies) {
        setDisplayText('Replies to my comments');
      } else {
        setDisplayText('New message available');
      }
   }, [showReplies]);

   const handleOnClick = () => {
      setIsRead(true);
      setShowReplies(!showReplies);
  
      const newCount = showReplies ? 0 : localReplyCount;
      localStorage.setItem('commentNotifCount', newCount.toString());

      mutate(); 
   };
  
   const replies = data?.replies.slice(0, 5) || [];
   const replyCount = Math.min(data?.replyCount || 0, 9);

  return (
   <div className="relative">
      <div className={`bg-primary-lighter pr-2 flex flex-col gap-2 items-center w-auto absolute right-[-5%] top-0 rounded-md cursor-pointer`} onClick={handleOnClick}>
         <div className="bg-white-main p-1 rounded-md flex items-center gap-2 font-unbounded text-xs w-full">
        
            <div className="relative">
               <FiMessageSquare size={30} />
               {!isRead && <div className="absolute bottom-0 right-0 bg-red-500 text-white-main rounded-xl text-xs py-0.25 px-1">{localReplyCount}</div>}
            </div>
            <p>{displayText}</p>
         </div>

         {showReplies && (
          <div className="flex flex-col gap-2">
            {replies.map((reply: CommentReplyProps) => (
              <Link href={`/profile/blog/${reply.novelId}`} key={reply.id}>
               <div className="ml-3 flex flex-col gap-0.5">
                  <div className="font-shoulders flex items-end gap-1">
                     <div className="flex text-sm md:text-base items-center">
                     <FiUser className="text-base mr-1" />
                     <p className="font-bold">{reply.user.username}</p>
                     </div>
                     <div className="text-xs md:text-sm text-grey">
                     replied to you:
                     </div>
                  </div>
                  <p className="italic md:text-xs">{reply.content}</p>
               </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentNotification