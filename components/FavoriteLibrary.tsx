import axios from 'axios'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { BiFolderOpen, BiCommentDetail } from 'react-icons/bi'
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io'
import { Button, LoaderRound, NoItem } from '@/components'
import { FavBookProps } from '@/types'
import { useRouter } from 'next/router'
import { WORDS_PER_PAGE } from '@/constants'

const FavoriteLibrary = () => {
   const router = useRouter();
   const [shelf, setShelf] = useState<FavBookProps[]>([]);
   const [openCard, setOpenCard] = useState<string | null>(null);
   const [bookData, setBookData] = useState<Record<string, { currPage: number; maxPage: number }>>({});
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchUserFavNovelList = async () => {
        try {
          const response = await axios.get('/api/favorite/novels');
          const userFavNovels = response.data;
          setShelf(userFavNovels);

          const storedBookData = JSON.parse(localStorage.getItem('bookData') || '{}');
          const defaultBookData = userFavNovels.reduce(
            (bookMapping: Record<string, { currPage: number; maxPage: number }>, book: FavBookProps) => {
               const maxPage = Math.ceil(book.content.length / WORDS_PER_PAGE);            
               bookMapping[book.id] = { currPage: 1, maxPage };
               return bookMapping;
            }, {}
         );
          const initialBookData = {
            ...defaultBookData,
            ...storedBookData,
            ...(typeof router.query.page === 'object' ? router.query.page : {}),
          };
          setBookData(initialBookData);
          localStorage.setItem('bookData', JSON.stringify(initialBookData));
        } catch (error) {
          console.error('Failed to fetch user favorites', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserFavNovelList();
   }, [router.query.page]);

   const handleCardClick = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
      if (openCard !== null && openCard === id && !(e.target as HTMLElement).closest('.fav-group')) {
        setOpenCard(null);
      } else {
        setOpenCard(id);
      }
   };

   const handlePageChange = (bookId: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const page = parseInt(e.target.value, 10);
      const { maxPage } = bookData[bookId];
      if (!isNaN(page) && page >= 1 && (!maxPage || page <= maxPage)) {
         setBookData((prev) => {
            const updatedData = { ...prev, [bookId]: { ...prev[bookId], currPage: page } };
            localStorage.setItem('bookData', JSON.stringify(updatedData));
            return updatedData;
         });
      }
   };

   const incrementPage = (bookId: string) => {
      const { currPage, maxPage } = bookData[bookId];
      if (currPage < (maxPage || Infinity)) { 
         setBookData((prev) => {
            const updatedData = { ...prev, [bookId]: { ...prev[bookId], currPage: prev[bookId].currPage + 1 } };
            localStorage.setItem('bookData', JSON.stringify(updatedData));
            return updatedData;
         });
      }
   };
  
   const decrementPage = (bookId: string) => {
      const { currPage } = bookData[bookId];
      if (currPage > 1) { 
         setBookData((prev) => {
            const updatedData = { ...prev, [bookId]: { ...prev[bookId], currPage: prev[bookId].currPage - 1 } };
            localStorage.setItem('bookData', JSON.stringify(updatedData));
            return updatedData;
         });
      }
   };

   if (!shelf) { return <NoItem variation={'nf'} linkHref="/profile" title="No Favorite Novels" description="Heart novels to add to your list and have an easier access." imageSrc="/images/heart.png" imageAlt="No Favorites Yet" /> }
   if (loading) { return <LoaderRound /> }
   if (shelf && shelf.length === 0) { return <NoItem variation={'nf'} linkHref="/profile" title="No Favorite Novels" description="Heart novels to add to your list and have an easier access." imageSrc="/images/heart.png" imageAlt="No Favorites Yet" /> }

  return (
    <div className="fav-container">
       {shelf.map((book) => (
          <div key={book.id} className={`fav-card ${openCard === book.id && 'open'}`}
          onClick={(e) => handleCardClick(book.id, e)}>
             <img src={book.coverImage} alt={`Cover of ${book.title}`} className="fav-img" />   
             <div className="fav-content">
                <div className="fav-title">{book.title}</div>
                <div className="fav-genre">{book.genre || book.author}</div>
                <div className={`fav-info ${openCard !== book.id && 'hidden'}`}>{book.description}</div>
             </div>
             <div className="fav-group">
                <div className="fav-pages">
                  {openCard === book.id && (
                  <div className="flex flex-col">
                     <IoMdArrowDropup className="page-up" onClick={() => incrementPage(book.id)} />
                     <IoMdArrowDropdown className="page-down" onClick={() => decrementPage(book.id)} />
                  </div>)}
                  <input type="number" name={`pageSelector-${book.id}`} value={bookData[book.id].currPage || 1}
                     className="fav-curr-page" min={1} max={bookData[book.id].maxPage} onChange={(e) => handlePageChange(book.id, e)} /> 
                  / 
                   <span className="fav-max-page">{bookData[book.id].maxPage}</span>
                </div>
                <div className={`fav-info fav-btns ${openCard !== book.id && 'hidden'}`}>
                   <Link href={{ pathname: `/profile/lounge/${book.id}`, query: { page:  bookData[book.id].currPage || 1 } }}>
                      <Button title="Read" additionalStyles="button-read" textStyles="text-sm"
                      btnType="button" leftIcon={<BiFolderOpen size={20} />} isDisabled={loading} />
                   </Link>
                   <Link href={{ pathname: `/profile/blog/${book.id}` }}>
                      <Button title="Blog" additionalStyles="button-blog" textStyles="text-sm"
                      btnType="button" leftIcon={<BiCommentDetail size={20} />} isDisabled={loading} />
                   </Link>
                </div>
             </div>
          </div>
       ))}
    </div>
  )
}

export default FavoriteLibrary