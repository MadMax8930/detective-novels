import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti'
import { FavoriteHeart, Button, MobileStack } from '@/components'
import { CarouselProps } from '@/types'

const Carousel: React.FC<CarouselProps> = ({ novels, adminPage, handleAdminSelectedNovelId }) => {
  const router = useRouter();
  const [selectedNovelId, setSelectedNovelId] = useState<string | null>();
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleNovelClick = (novelId: string) => {
    setSelectedNovelId(novelId);
    if (adminPage && handleAdminSelectedNovelId) {
      handleAdminSelectedNovelId(novelId);
    } else {
      router.push(`/profile?novel=${novelId}`);
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    let goRight: NodeJS.Timeout;
    let goLeft: NodeJS.Timeout;

    if (novels.length > 7) {
      const startAutoplay = () => {
         goRight = setInterval(() => { handleNextClick() }, 10000);
         goLeft = setInterval(() => { handlePrevClick() }, 20000);
      };

      const stopAutoplay = () => { clearInterval(goRight); clearInterval(goLeft) };

      startAutoplay();

      return () => { stopAutoplay() };
    }
  }, [novels]);

  return (
   <div className={`px-12 pt-6 pb-2 ${adminPage ? 'bg-admin-inner' : 'bg-primary-light'}`}>
      <div className="carousel-container">
         {adminPage && selectedNovelId && (<div className="carousel-novel-id">NOVEL ID : {selectedNovelId}</div>)}
         <div className="carousel" ref={carouselRef}>
            {novels.map((novel) => (<>
               <div key={novel.id} onClick={() => novel.id && handleNovelClick(novel.id)}
                  className={`carousel__nav-item ${(selectedNovelId === novel.id && !adminPage) ? 'active' : (selectedNovelId === novel.id && adminPage) ? 'active-admin' : ''}`}>
                  <img src={novel.coverImage} alt={`Cover of ${novel.title}`} /> 
                  <Link href={`/profile/lounge/${novel.id}`}><div className="carousel-novel-title">{novel.title}</div></Link>
                  <FavoriteHeart novelId={novel.id} />
               </div>
            </>))}
         </div>
         <div className={`carousel-controls ${adminPage && 'text-white-main'}`}>
            <Button action={handlePrevClick} leftIcon={<TiArrowLeftThick size={30} />} tooltip="Prev" additionalStyles="carousel-btn" />
            <Button action={handleNextClick} rightIcon={<TiArrowRightThick size={30} />} tooltip="Next" additionalStyles="carousel-btn" />
         </div>
      </div>
      <div className="mobile-container">
         <MobileStack novels={novels} onNovelClick={handleNovelClick} />
      </div>
   </div>
  );
};

export default Carousel