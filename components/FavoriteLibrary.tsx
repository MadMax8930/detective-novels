import axios from 'axios'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { BiFolderOpen, BiCommentDetail } from 'react-icons/bi'
import { Button, LoaderRound } from '@/components'
import { FavBookProps } from '@/types'

const FavoriteLibrary = () => {
   const [shelf, setShelf] = useState<FavBookProps[]>([]);
   const [openCard, setOpenCard] = useState<string | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchUserFavNovelList = async () => {
        try {
          const response = await axios.get('/api/favorite/novels');
          const userFavNovels = response.data;
          setShelf(userFavNovels);
        } catch (error) {
          console.error('Failed to fetch user favorites', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserFavNovelList();
   }, []);

   const handleCardClick = (id: string) => {
      if (openCard !== null && openCard === id) {
        setOpenCard(null);
      } else {
        setOpenCard(id);
      }
   };

   if (loading) { return <LoaderRound /> }

  return (
    <div className='fav-container'>
       {shelf.map((book) => (
          <div key={book.id} className={`fav-card ${openCard === book.id && 'open'}`}
          onClick={() => handleCardClick(book.id)}>
             <img src={book.coverImage} alt={`Cover of ${book.title}`} className='fav-img'/>   
             <div className='fav-content'>
                <div className="fav-title">{book.title}</div>
                <div className="fav-genre">{book.genre || book.author}</div>
                <div className={`fav-info ${openCard !== book.id && 'hidden'}`}>{book.description}</div>
             </div>
             <div className='fav-group'>
                <div className='fav-pages'>
                   <span className='fav-curr-page'>14</span> / <span className='fav-max-page'>30</span>
                </div>
                <div className={`fav-info fav-btns ${openCard !== book.id && 'hidden'}`}>
                   <Link href={{ pathname: `/profile/lounge/${book.id}` }}>
                      <Button title="Read" additionalStyles="button-read" textStyles='text-sm' 
                      btnType="button" reactIcon={<BiFolderOpen size={21} />} isDisabled={loading} />
                   </Link>
                   <Link href={{ pathname: `/profile/blog/${book.id}` }}>
                      <Button title="Blog" additionalStyles="button-blog" textStyles='text-sm'
                      btnType="button" reactIcon={<BiCommentDetail size={21} />} isDisabled={loading} />
                   </Link>
                </div>
             </div>
          </div>
       ))}
    </div>
  )
}

export default FavoriteLibrary