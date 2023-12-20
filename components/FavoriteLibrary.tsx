import axios from 'axios'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { BiFolderOpen, BiCommentDetail } from 'react-icons/bi'
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io'
import { Button, LoaderRound } from '@/components'
import { FavPageProps, FavBookProps } from '@/types'

const FavoriteLibrary: React.FC<FavPageProps> = ({ currPage, maxPage }) => {
   const [shelf, setShelf] = useState<FavBookProps[]>([]);
   const [openCard, setOpenCard] = useState<string | null>(null);
   const [loading, setLoading] = useState(true);
   const [selectedPages, setSelectedPages] = useState<Record<string, number>>({});

   useEffect(() => {
      const fetchUserFavNovelList = async () => {
        try {
          const response = await axios.get('/api/favorite/novels');
          const userFavNovels = response.data;
          setShelf(userFavNovels);

          const storedSelectedPages = JSON.parse(localStorage.getItem('selectedPages') || '{}');
          const defaultPages = userFavNovels.reduce((pageMapping: Record<string, number>, book: FavBookProps) => {
            pageMapping[book.id] = 1;
            return pageMapping;
          }, {});
          const initialSelectedPages = {
            ...defaultPages,
            ...storedSelectedPages,
            ...(typeof currPage === 'object' ? currPage : {}),
          };
          setSelectedPages(initialSelectedPages);
          localStorage.setItem('selectedPages', JSON.stringify(initialSelectedPages));
        } catch (error) {
          console.error('Failed to fetch user favorites', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserFavNovelList();
   }, [currPage]);

   const handleCardClick = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
      if (openCard !== null && openCard === id && !(e.target as HTMLElement).closest('.fav-group')) {
        setOpenCard(null);
      } else {
        setOpenCard(id);
      }
   };

   const handlePageChange = (bookId: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const page = parseInt(e.target.value, 10);
      if (!isNaN(page) && page >= 1 && (!maxPage || page <= maxPage)) {
         setSelectedPages((prev) => {
            const updatedPages = { ...prev, [bookId]: page };
            localStorage.setItem('selectedPages', JSON.stringify(updatedPages));
            return updatedPages;
         });
      }
   };

   const incrementPage = (bookId: string) => {
      if (selectedPages[bookId] < (maxPage || Infinity)) { 
         setSelectedPages((prev) => {
            const updatedPages = { ...prev, [bookId]: prev[bookId] + 1 };
            localStorage.setItem('selectedPages', JSON.stringify(updatedPages));
            return updatedPages;
         });
      }
   };
  
   const decrementPage = (bookId: string) => {
      if (selectedPages[bookId] > 1) { 
         setSelectedPages((prev) => {
            const updatedPages = { ...prev, [bookId]: prev[bookId] - 1 };
            localStorage.setItem('selectedPages', JSON.stringify(updatedPages));
            return updatedPages;
         });
      }
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
                     <IoMdArrowDropup className='page-up' onClick={() => incrementPage(book.id)} />
                     <IoMdArrowDropdown className='page-down' onClick={() => decrementPage(book.id)} />
                  </div>)}
                  <input type="number" name={`pageSelector-${book.id}`} value={selectedPages[book.id] || 1}
                     className='fav-curr-page' min={1} max={maxPage} onChange={(e) => handlePageChange(book.id, e)} /> 
                  / 
                   <span className='fav-max-page'>{maxPage}</span>
                </div>
                <div className={`fav-info fav-btns ${openCard !== book.id && 'hidden'}`}>
                   <Link href={{ pathname: `/profile/lounge/${book.id}`, query: { page: selectedPages[book.id] || 1 } }}>
                      <Button title="Read" additionalStyles="button-read" textStyles='text-sm' 
                      btnType="button" reactIcon={<BiFolderOpen size={20} />} isDisabled={loading} />
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