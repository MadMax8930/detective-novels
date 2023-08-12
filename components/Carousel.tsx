import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti'
import { CarouselProps } from '@/types'

const Carousel: React.FC<CarouselProps> = ({ novels, adminPage }) => {
  const router = useRouter();
  const [selectedNovelId, setSelectedNovelId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleNovelClickProfile = (novelId: string) => {
    setSelectedNovelId(novelId);
    router.push(`/profile?novel=${novelId}`);
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
   <div className={`px-12 pt-24 ${adminPage ? 'bg-white-main': 'bg-primary-red-100'}`}>
      <div className="carousel-container">
         <div className="carousel" ref={carouselRef}>
         {novels.map((novel) => (
            <div
               key={novel.id}
               onClick={() => adminPage ? setSelectedNovelId(novel.id) : handleNovelClickProfile(novel.id)}
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
   </div>
  );
};

export default Carousel