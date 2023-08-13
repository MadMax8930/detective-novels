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
   <div className={`px-12 pt-24 ${adminPage ? 'bg-zinc-200' : 'bg-white-main'}`}>
      <div className="carousel-container">
         <div className="carousel" ref={carouselRef}>
         {novels.map((novel) => (
            <div
               key={novel.id}
               onClick={() => novel.id && handleNovelClick(novel.id)}
               className={`carousel__nav-item ${selectedNovelId === novel.id ? 'active' : ''}`}
            >
               <img
               src={novel.coverImage}
               alt={`Cover of ${novel.title}`}
               />
            </div>
         ))}
         </div>
         <div className="carousel-controls">
         <button className="carousel-btn" onClick={handlePrevClick}>
            <TiArrowLeftThick size={30} />
         </button>
         <button className="carousel-btn" onClick={handleNextClick}>
            <TiArrowRightThick size={30} />
         </button>
         </div>
      </div>
      {adminPage && selectedNovelId && (
        <div className="text-center italic absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="flex flex-col">Selected Novel ID:<span className="text-lg">{" "}{selectedNovelId}</span></p>
        </div>
      )}
   </div>
  );
};

export default Carousel