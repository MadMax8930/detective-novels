import axios from 'axios'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { BiFolderOpen, BiCommentDetail } from 'react-icons/bi'
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io'
import { Button, LoaderRound } from '@/components'
import { FavPageProps, FavBookProps } from '@/types'

const FavoriteLibrary: React.FC<FavPageProps> = ({ selectedPage, maxPage }) => {
   const [shelf, setShelf] = useState<FavBookProps[]>([]);
   const [openCard, setOpenCard] = useState<string | null>(null);
   const [selectedPageNumber, setSelectedPageNumber] = useState<number>(selectedPage || 1);
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

   const handleCardClick = (id: string, event: React.MouseEvent<HTMLDivElement>) => {
      if (openCard !== null && openCard === id && !(event.target as HTMLElement).closest('.fav-group')) {
        setOpenCard(null);
      } else {
        setOpenCard(id);
      }
   };

   const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const page = parseInt(event.target.value, 10);
      if (!isNaN(page) && page >= 1 && (!maxPage || page <= maxPage)) {
        setSelectedPageNumber(page);
      }
   };

   const incrementPage = () => {
      if (selectedPageNumber < (maxPage || Infinity)) { setSelectedPageNumber(selectedPageNumber + 1) }
   };
  
   const decrementPage = () => {
      if (selectedPageNumber > 1) { setSelectedPageNumber(selectedPageNumber - 1) }
   };

   if (loading) { return <LoaderRound /> }

  return (
    <div className='fav-container'>
       {shelf.map((book) => (
          <div key={book.id} className={`fav-card ${openCard === book.id && 'open'}`}
          onClick={(e) => handleCardClick(book.id, e)}>
             <img src={book.coverImage} alt={`Cover of ${book.title}`} className='fav-img'/>   
             <div className='fav-content'>
                <div className="fav-title">{book.title}</div>
                <div className="fav-genre">{book.genre || book.author}</div>
                <div className={`fav-info ${openCard !== book.id && 'hidden'}`}>{book.description}</div>
             </div>
             <div className='fav-group'>
                <div className='fav-pages'>
                  {openCard === book.id && (
                  <div className='flex flex-col'>
                     <IoMdArrowDropup className='page-up' onClick={incrementPage} />
                     <IoMdArrowDropdown className='page-down' onClick={decrementPage} />
                  </div>)}
                  <input type="number" name="pageSelector" value={selectedPageNumber}
                     onChange={handlePageChange} min={1} max={maxPage}
                     className='fav-curr-page'/>
                   / 
                   <span className='fav-max-page'>{maxPage}</span>
                </div>
                <div className={`fav-info fav-btns ${openCard !== book.id && 'hidden'}`}>
                   <Link href={{ pathname: `/profile/lounge/${book.id}`, query: { page: selectedPageNumber } }}>
                      <Button title="Read" additionalStyles="button-read" textStyles='text-sm' 
                      btnType="button" reactIcon={<BiFolderOpen size={20} />} isDisabled={loading} 
                     //  action={() => handleCardClick(book.id, selectedPage) } 
                      />
                   </Link>
                   <Link href={{ pathname: `/profile/blog/${book.id}` }}>
                      <Button title="Blog" additionalStyles="button-blog" textStyles='text-sm'
                      btnType="button" reactIcon={<BiCommentDetail size={20} />} isDisabled={loading} />
                   </Link>
                </div>
             </div>
          </div>
       ))}
    </div>
  )
}

export default FavoriteLibrary