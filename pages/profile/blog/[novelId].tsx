import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NotFound, LoaderLight, CommentPrompt, CommentList, BookAnimation, Footer } from '@/components'
import { getUserSessionServerSideProps } from '@/lib/sessionProps'
import type { NextPageWithLayout } from '@/pages/_app'
import { ProfileProps, CommentProps, ButtonAction } from '@/types'
import useCommentList from '@/hooks/useCommentList'
import useNovelList from '@/hooks/useNovelList'

import type { ReactElement } from 'react'
import { metadata } from '@/pages/_app'
import RootLayout from '@/pages/_layout'
import ProfileLayout, { metadataProfile } from '../_layout'

// Protecting routes by fetching user session on client side
export const getServerSideProps = getUserSessionServerSideProps;

const BlogId: NextPageWithLayout<ProfileProps>  = ({ session }) => {
   const router = useRouter();
   const novelId = router.query.novelId as string;
   const [currentNovelIndex, setCurrentNovelIndex] = useState<number>(0);
   const { data: novels, isLoading: loadNovels, error: errorNovels } = useNovelList();
   const { data: fetchedComments, isLoading: loadComments, mutate: mutateComments } = useCommentList(novelId);

   const [messageBody, setMessageBody] = useState('');
   const [parentMessageId, setParentMessageId] = useState<string | null>(null);

   const [editingComment, setEditingComment] = useState<CommentProps | null>(null);
   const [replyingComment, setReplyingComment] = useState<CommentProps | null>(null);
   const handleEdit = (comment: CommentProps) => setEditingComment(comment);
   const handleReply = (comment: CommentProps) => setReplyingComment(comment);
   
   const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
   const [btnAction, setBtnAction] = useState<ButtonAction>(null);
   const handleCommentClick = (commentId: string | null, action: ButtonAction) => {
      setSelectedCommentId(commentId);
      setBtnAction(action);
   };

   const cancelSend = () => {
      setParentMessageId(null);
      setEditingComment(null);
      setReplyingComment(null);   
      setSelectedCommentId(null);
      setBtnAction(null);
      setMessageBody('');
   };
   
   const onNextClick = () => {
      if (novels && novels.length > 0) {
        const nextIndex = (currentNovelIndex + 1) % novels.length;
        setCurrentNovelIndex(nextIndex);
        router.push(`/profile/blog/${novels[nextIndex].id}`);
      }
   };
  
   const onPrevClick = () => {
      if (novels && novels.length > 0) {
        const prevIndex = (currentNovelIndex - 1 + novels.length) % novels.length;
        setCurrentNovelIndex(prevIndex);
        router.push(`/profile/blog/${novels[prevIndex].id}`);
      }
   };

   useEffect(() => {
      if (novels) { 
         const index = novels.findIndex((item: CommentProps) => item.id === novelId);
         setCurrentNovelIndex(index >= 0 ? index : 0);
      }
   }, [novels, novelId]);

   if (errorNovels) { return <NotFound/> }
   if (loadNovels) { return <LoaderLight /> } 

  return (
    <div className='pt-20 bg-primary-lighter'>
      {novels && novels.length > 0 && (
      <BookAnimation 
         novel={novels[currentNovelIndex]} 
         onPrevClick={onPrevClick} 
         onNextClick={onNextClick}
         isPreviewPage={false} 
      />)}
      {novels && novels.length > 0 && (
      <CommentPrompt
         novelId={novelId}
         novel={novels[currentNovelIndex]}
         mutate={mutateComments} 
         replyingComment={replyingComment}
         setReplyingComment={setReplyingComment}
         editingComment={editingComment} 
         setEditingComment={setEditingComment}
         cancelSend={cancelSend}
         authUser={session.id} 
         messageBody={messageBody}
         setMessageBody={setMessageBody}
         parentMessageId={parentMessageId}
         setParentMessageId={setParentMessageId}
         buttonSelection={{
            handleCommentClick,
            selectedCommentId,
            btnAction,
         }} />)}
      <CommentList
         comments={fetchedComments} 
         loading={loadComments} 
         mutate={mutateComments} 
         onReply={handleReply}
         onEdit={handleEdit}
         authUser={session.id}
         buttonSelection={{
            handleCommentClick,
            selectedCommentId,
            btnAction,
         }} />
      <Footer bgLight={true} extraWrapper={true} borderTop={false} />
    </div>
  )
}

BlogId.getLayout = function getLayout(page: ReactElement, props: ProfileProps) {
   return (
      <RootLayout metadata={metadata}>
         <ProfileLayout layoutMetadata={metadataProfile || metadata} session={props.session}>{page}</ProfileLayout>
      </RootLayout>
   )
}

export default BlogId