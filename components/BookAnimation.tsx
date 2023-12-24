import React from 'react'
import { DEFAULT_COVER, BOOK_MAX_CHARS } from '@/constants'
import { NovelDBProps } from '@/types'

const BookAnimation = ({ novel }: { novel: NovelDBProps }) => {
 
   const truncate = (text: string, maxChars: number) => {
     if (text.length <= maxChars) {
       return text;
     } else {
       return text.substring(0, maxChars) + '...';
     }
   };
 
   const truncatedText = truncate(novel.preview || novel.description, BOOK_MAX_CHARS);

  return (
    <div className="book-card">
      <div className="book-image-box">
         <div className="book-inside"></div>
         <img src={novel.coverImage || DEFAULT_COVER} alt="Book Cover" />
      </div>
      <div className="book-details-box">
         <h1>{novel.title}</h1>
         <p>{truncatedText}</p>
         <p className="text-id">❞NovelId: {novel.id}❞</p>
         <p className="text-right">{novel.genre}</p>
         <p className="text-right">by {novel.author}</p>
      </div>
    </div>
  )
}

export default BookAnimation