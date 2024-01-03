import React from 'react'
import Link from 'next/link'
import { Button } from '@/components'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { DEFAULT_COVER, BOOK_MAX_CHARS } from '@/constants'
import { truncate } from '@/lib/truncateContent'
import { BookAnimationProps } from '@/types'

const BookAnimation: React.FC<BookAnimationProps> = ({ novel, onPrevClick, onNextClick, isPreviewPage }) => {
   const truncatedText = truncate(novel.description || novel.preview, BOOK_MAX_CHARS);

  return (
    <div className="relative">
      <div className={`${isPreviewPage ? 'bg-transparent' : 'bg-tooltip-container-200'} pb-4 pt-10`}>
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
      <div className="absolute md:left-20 left-4 top-40 text-grey">
         <Button tooltip="Prev" action={onPrevClick} leftIcon={<MdKeyboardDoubleArrowLeft size={70} />} />
      </div>
      <div className="absolute md:right-32 right-16 top-40 text-grey">
         <Button tooltip="Next" action={onNextClick} rightIcon={<MdKeyboardDoubleArrowRight size={70} />} />
      </div></>)}
    </div>
  )
}

export default BookAnimation