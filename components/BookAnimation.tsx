import React from 'react'
import Link from 'next/link'
import { Button } from '@/components'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { DEFAULT_COVER, BOOK_MAX_CHARS } from '@/constants'
import { BookAnimationProps } from '@/types'

const BookAnimation: React.FC<BookAnimationProps> = ({ novel, onPrevClick, onNextClick, isPreviewPage }) => {
 
   const truncate = (text: string, maxChars: number) => {
     if (text.length <= maxChars) {
       return text;
     } else {
       return text.substring(0, maxChars) + '...';
     }
   };
 
   const truncatedText = truncate(novel.description || novel.preview, BOOK_MAX_CHARS);

  return (
    <div className="relative">
      <div className={`${isPreviewPage ? 'bg-transparent' : 'bg-tooltip-container-200'} py-4`}>
         <div className="book-card">
            <div className="book-image-box">
               <div className="book-inside"></div>
               <img src={novel?.coverImage || DEFAULT_COVER} alt="Book Cover" />
            </div>
            <div className="book-details-box">
               <h1>❞{novel.title}❞</h1>
               <p>{truncatedText}</p>
               <div className="flex justify-between relative">
                  <Link href={`/profile/lounge/${novel.id}`}><Button title="Read" additionalStyles="button-book-anim" /></Link>
                  <div className="text-right">
                     <p>{novel.genre}</p>
                     <p>by {novel.author}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
      {onPrevClick && onNextClick && (<>
      <div className="absolute left-20 top-40 text-grey">
         <Button tooltip="Prev" action={onPrevClick} leftIcon={<MdKeyboardDoubleArrowLeft size={70} />} />
      </div>
      <div className="absolute right-32 top-40 text-grey">
         <Button tooltip="Next" action={onNextClick} rightIcon={<MdKeyboardDoubleArrowRight size={70} />} />
      </div></>)}
    </div>
  )
}

export default BookAnimation