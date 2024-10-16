import React from 'react';

type MovieCardProps = {
  id: string;
  imageURL: string;
  title: string;
  summary: string;
  rating: number;
};

const MovieCard: React.FC<MovieCardProps> = ({ id, imageURL, title, summary, rating}) => {
  
  
  return (
    <div className='relative bg-black  w-full h-[65vh] shadow-xl rounded-[20px] overflow-hidden'>
      <div className="bg-black relative   shadow-black rounded-lg overflow-hidden ">
        <div className='relative h-[55vh]'>
        <div className='absolute w-full h-full z-10'></div>
        <img className="w-full " src={imageURL} alt={title} />
        </div>
        <div className='bottom-0 relative -mt-20 w-full p-5 bg-gradient-to-b from-transparent via-black to-black z-10'>
          <h3 className="text-lg font-bold mt-2 text-white">{title}</h3>
          <p className="text-sm text-gray-600 mt-2">{summary}</p>
          <p className="text-sm text-gray-700 mt-2 font-semibold">Rating: {rating}</p>
        </div>
      </div>
    </div>
  );
};


export default MovieCard;