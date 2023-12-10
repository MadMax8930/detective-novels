import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti'
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

  return (
   <div className={`px-12 pt-20 pb-2 ${adminPage ? 'bg-admin-carousel pt-6' : 'bg-white-main'}`}>
      <div className="carousel-container">
         {adminPage && selectedNovelId && (
            <div className="carousel-novel-id text-center md:text-base text-xs text-white-main">
               <span className="flex gap-1 uppercase">NOVEL ID : {selectedNovelId}</span>
            </div>
         )}
         <div className="carousel" ref={carouselRef}>
         {novels.map((novel) => (
            <div key={novel.id} onClick={() => novel.id && handleNovelClick(novel.id)}
               className={`carousel__nav-item ${(selectedNovelId === novel.id && !adminPage) ? 'active' : (selectedNovelId === novel.id && adminPage) ? 'active-admin' : ''}`}>
               <img src={novel.coverImage} alt={`Cover of ${novel.title}`} />
            </div>
         ))}
         </div>
         <div className={`carousel-controls ${adminPage && 'text-white-main'}`}>
            <button className="carousel-btn" onClick={handlePrevClick}><TiArrowLeftThick size={30} /></button>
            <button className="carousel-btn" onClick={handleNextClick}><TiArrowRightThick size={30} /></button>
         </div>
      </div>
   </div>
  );
};

export default Carousel