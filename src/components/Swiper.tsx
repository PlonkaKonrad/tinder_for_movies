import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { useRecommendation } from '../context/RecomendationContext';
import MovieCard from './MovieCard';

interface Movie {
  id: string;
  imageURL: string;
  title: string;
  summary: string;
  rating: number;
}

function Swiper() {
  const { recommendations, accept, reject } = useRecommendation();
  const [currentIndex, setCurrentIndex] = useState(recommendations.length - 1);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    setCurrentIndex(recommendations.length - 1);
  }, [recommendations]);

  const childRefs = useMemo(
    () =>
      Array(recommendations.length)
        .fill(null)
        .map(() => React.createRef<any>()),
    [recommendations.length]
  );
  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  const handleSwipe = async (dir: 'left' | 'right') => {
    if (canSwipe && currentIndex < recommendations.length) {
      await childRefs[currentIndex].current?.swipe(dir);  // Now expects Promise<void>
    }
  };

  const handleSwiped = (direction: string, movieId: string, index: number) => {
    updateCurrentIndex(index - 1);
    direction === 'left' ? reject(movieId) : accept(movieId);
  };

  const handleOutOfFrame = (idx: number) => {
    if (currentIndexRef.current >= idx) {
      childRefs[idx].current?.restoreCard();
    }
  };

  const renderSwipeButtons = () => (
    <div className="flex gap-5">
      <button className="action-btn reject-btn" onClick={() => handleSwipe('left')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <button className="action-btn accept-btn" onClick={() => handleSwipe('right')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      {canSwipe ? (
        <>
          <div className="w-[90vw] max-w-[400px] h-[70vh] relative">
            {recommendations.map((movie: Movie, index: number) => (
              <TinderCard
                ref={childRefs[index]}
                className="absolute"
                key={movie.id}
                onSwipe={(dir) => handleSwiped(dir, movie.id, index)}
                onCardLeftScreen={() => handleOutOfFrame(index)}
                swipeRequirementType="position"
                preventSwipe={['up', 'down']}
              >
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  imageURL={movie.imageURL}
                  title={movie.title}
                  summary={movie.summary}
                  rating={movie.rating}
                />
              </TinderCard>
            ))}
          </div>
          {renderSwipeButtons()}
        </>
      ) : (
        <div>
          <p className="text-[#242] text-4xl">That's all for now!</p>
        </div>
      )}
    </div>
  );
}

export default Swiper;
