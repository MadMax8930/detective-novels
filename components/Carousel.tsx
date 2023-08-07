import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const Carousel: React.FC<{ novels: Array<any> }> = ({ novels }) => {
  const router = useRouter();
  const [selectedNovelId, setSelectedNovelId] = useState<string | null>(null);

  const handleNovelClick = (novelId: string) => {
    setSelectedNovelId(novelId);
    router.push(`/profile?novel=${novelId}`);
  };

  const handlePrevClick = () => {
    const currentIndex = novels.findIndex((novel) => novel.id === selectedNovelId);
    if (currentIndex > 0) {
      setSelectedNovelId(novels[currentIndex - 1].id);
    }
  };

  const handleNextClick = () => {
    const currentIndex = novels.findIndex((novel) => novel.id === selectedNovelId);
    if (currentIndex < novels.length - 1) {
      setSelectedNovelId(novels[currentIndex + 1].id);
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {novels.map((novel) => (
          <div
            key={novel.id}
            onClick={() => handleNovelClick(novel.id)}
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
          <BsArrowLeft size={24} />
        </button>
        <button className="carousel-btn" onClick={handleNextClick}>
          <BsArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Carousel