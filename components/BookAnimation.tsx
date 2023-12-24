import React from 'react'
import { DEFAULT_COVER } from '@/constants'
import { NovelDBProps } from '@/types'

const BookAnimation = ({ novel }: { novel: NovelDBProps }) => {
  return (
    <div className="book-card">
      <div className="book-image-box">
         <div className="book-inside"></div>
         <img src={novel.coverImage || DEFAULT_COVER} alt="Book Cover" />
      </div>
      <div className="book-details-box">
         <h1>{novel.title}</h1>
         <p>Replace this text by my text pls</p>
         <p>Replace this text by my text pls</p>
         <p>Replace this text by my text pls</p>
         <p>Replace this text by my text pls</p>
         <p>Replace this text by my text pls</p>
         <p>Replace this text by my text pls</p>
         <p>Replace this text by my text pls</p>
         <p>Replace this text by my text pls</p>
         <p className="text-grey">❞{novel.id}❞</p>
         <p className="text-right">{novel.genre}</p>
         <p className="text-right">by {novel.author}</p>
      </div>
    </div>
  )
}

export default BookAnimation