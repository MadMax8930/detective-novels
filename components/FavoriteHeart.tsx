import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, LoaderFav  } from '@/components'
import { TiHeart } from 'react-icons/ti'
import { toast } from 'react-hot-toast'

const FavoriteHeart = ({novelId}: { novelId: string | undefined}) => {
   const [isFavorited, setIsFavorited] = useState<boolean | undefined>();
   const [loading, setLoading] = useState(false);

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
         setLoading(true);
         await axios.post('/api/favorite', { novelId });

         console.log('Novel favorited successfully.');
         toast.success('Novel favorited');
         setIsFavorited(true);
      } catch (error) {
         console.error('Favorite implementation has failed', error);
         toast.error('An error occurred');
      } finally {
         setLoading(false);
      }
   };

   const deleteFav = async () => {
      try {
         setLoading(true);
         await axios.delete(`/api/favorite?novelId=${novelId}`);

         console.log('Novel un-favorited successfully.');
         toast.success('Novel un-favorited');
         setIsFavorited(false);
      } catch (error) {
         console.error('Favorite removal has failed', error);
         toast.error('An error occurred');
      } finally {
         setLoading(false);
      }
   };

   if (isFavorited === undefined) { return <LoaderFav /> }

  return (
    <div className="absolute top-0 right-0">
      <Button btnType="button" leftIcon={<TiHeart size={25} />}
         action={isFavorited ? deleteFav : postFav} 
         additionalStyles={isFavorited ? "button-unfav" : "button-fav"} 
         isDisabled={loading} />
    </div>
  )
}

export default FavoriteHeart