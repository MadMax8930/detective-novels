import axios from 'axios'
import React, { useState } from 'react'
import { Button  } from '@/components'
import { TiHeart } from 'react-icons/ti'
import { toast } from 'react-hot-toast'

const FavoriteHeart = ({novelId}: { novelId: string | undefined}) => {
   const [isFavorited, setIsFavorited] = useState();
   const [loading, setLoading] = useState(false);

   const postFav = async () => {
      try {
         setLoading(true);
         await axios.post('/api/favorite', novelId);

         console.log('Novel favorited successfully.');
         toast.success('Novel favorited.');
      } catch (error) {
         console.error('Favorite implementation has failed', error);
         toast.error('An error occurred.');
      } finally {
         setLoading(false);
      }
   };

   const deleteFav = async () => {
      try {
         setLoading(true);
         await axios.delete(`/api/favorite?novelId=${novelId}`);

         console.log('Novel un-favorited successfully.');
         toast.success('Novel un-favorited.');
      } catch (error) {
         console.error('Favorite removal has failed', error);
         toast.error('An error occurred.');
      } finally {
         setLoading(false);
      }
   };

  return (
    <div className="flex justify-center space-x-2 absolute top-0 right-0">
      {
      isFavorited
     ?
     <Button btnType="button" action={deleteFav} additionalStyles="button-unfav" reactIcon={<TiHeart size={25} />} isDisabled={loading} />
     :
     <Button btnType="button" action={postFav} additionalStyles="button-fav" reactIcon={<TiHeart size={25} />} isDisabled={loading} />
      }
    </div>
  )
}

export default FavoriteHeart