import Link from 'next/link'
import { FavoriteHeart } from '@/components'
import { MobileStackProps } from '@/types'
 
const MobileStack: React.FC<MobileStackProps> = ({ novels, onNovelClick }) => {
   return (
     <>
       {novels.map((novel) => (
         <div key={novel.id} onClick={() => novel.id && onNovelClick(novel.id)}
         className={`mobile-card `}>
           <Link href={`/profile/lounge/${novel.id}`}><img src={novel.coverImage} alt={`Cover of ${novel.title}`} className="mobile-img" /></Link>
           <div className="mobile-content">
               <div className="mobile-title">{novel.title}</div>
               <div className="mobile-genre">{novel.genre || novel.author}</div>
           </div>
           <FavoriteHeart novelId={novel.id} />
         </div>
       ))}
     </>
   )
}
 
export default MobileStack