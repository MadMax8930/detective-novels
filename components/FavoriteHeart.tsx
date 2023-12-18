import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button  } from '@/components'
import { TiHeart } from 'react-icons/ti'
import { toast } from 'react-hot-toast'

const FavoriteHeart = ({novelId}: { novelId: string | undefined}) => {
   const [isFavorited, setIsFavorited] = useState<boolean>();
   const [loadingPost, setLoadingPost] = useState(false);
   const [loadingDelete, setLoadingDelete] = useState(false);

   useEffect(() => {
      const fetchUserFavorites = async () => {
        try {
          const response = await axios.get('/api/favorite/listAll');
          const userFavorites = response.data.map((fav: { novelId: string }) => fav.novelId);
          setIsFavorited(userFavorites.includes(novelId));
        } catch (error) {
          console.error('Failed to fetch user favorites', error);
        }
      };
  
      fetchUserFavorites();
   }, [novelId]);

   const postFav = async () => {
      try {
         setLoadingPost(true);
         await axios.post('/api/favorite', { novelId });

         console.log('Novel favorited successfully.');
         toast.success('Novel favorited.');
         setIsFavorited(true);
      } catch (error) {
         console.error('Favorite implementation has failed', error);
         toast.error('An error occurred.');
      } finally {
         setLoadingPost(false);
      }
   };

   const deleteFav = async () => {
      try {
         setLoadingDelete(true);
         await axios.delete(`/api/favorite?novelId=${novelId}`);

         console.log('Novel un-favorited successfully.');
         toast.success('Novel un-favorited.');
         setIsFavorited(false);
      } catch (error) {
         console.error('Favorite removal has failed', error);
         toast.error('An error occurred.');
      } finally {
         setLoadingDelete(false);
      }
   };

  return (
    <div className="absolute top-0 right-0">
      {isFavorited
         ?
         <Button btnType="button" action={deleteFav} additionalStyles="button-unfav" reactIcon={<TiHeart size={25} />} isDisabled={loadingDelete} />
         :
         <Button btnType="button" action={postFav} additionalStyles="button-fav" reactIcon={<TiHeart size={25} />} isDisabled={loadingPost} />
      }
    </div>
  )
}

export default FavoriteHeart