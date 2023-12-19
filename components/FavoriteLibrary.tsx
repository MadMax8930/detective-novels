import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BiFolderOpen, BiCommentDetail } from 'react-icons/bi'
import { FavBookProps } from '@/types'
import { Button } from '@/components'

const FavoriteLibrary = () => {
   const [shelf, setShelf] = useState<FavBookProps[]>([]);
   const [openCard, setOpenCard] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fetchUserFavNovelList = async () => {
        try {
          const response = await axios.get('/api/favorite/novels');
          const userFavNovels = response.data;
          setShelf(userFavNovels);
        } catch (error) {
          console.error('Failed to fetch user favorites', error);
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

  return (
    <div className='bg-[#131325] text-black'>
      <div className='flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fav-list'>
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
                     <Button title="Read" additionalStyles="button-read" textStyles='text-sm' 
                     reactIcon={<BiFolderOpen size={21} />} isDisabled={loading} action={() => {}} />
                     <Button title="Blog" additionalStyles="button-blog" textStyles='text-sm'
                     reactIcon={<BiCommentDetail size={21} />} isDisabled={loading} action={() => {}} />
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  )
}

export default FavoriteLibrary