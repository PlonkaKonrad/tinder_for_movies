import React from 'react';
import { RecommendationProvider } from './context/RecomendationContext';
import 'react-toastify/dist/ReactToastify.css';
import Swiper from './components/Swiper';


const App: React.FC = () => {
  return (
    <RecommendationProvider>
      <div className="max-w-full h-screen overflow-hidden   bg-gradient-to-r from-[#FD297B] via-[#FF5864] to-[#FF655B]">
        <header className="p-6 absolute text-[#424242]">
          <h1 className="text-3xl font-bold">scrinder</h1>
        </header>
        <main className='overflow-hidden'>
          <Swiper />
        </main>
      </div> 
xxx    </RecommendationProvider >
  );
};

export default App;
