import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getRecommendations, acceptRecommendation, rejectRecommendation } from '../api/api';

type Recommendation = {
  id: string;
  imageURL: string;
  title: string;
  summary: string;
  rating: number;
};

type RecommendationContextType = {
  recommendations: Recommendation[];
  accept: (id: string) => void;
  reject: (id: string) => void;
};

type RecommendationProviderProps = {
  children: ReactNode; 
};

const RecommendationContext = createContext<RecommendationContextType | undefined>(undefined);

export const RecommendationProvider: React.FC<RecommendationProviderProps> = ({ children }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecommendations();
      setRecommendations(data);
    };

    fetchData();
  }, []);

  const accept = (id: string) => {
    acceptRecommendation(id);
  };

  const reject = (id: string) => {
    rejectRecommendation(id);
  };

  return (
    <RecommendationContext.Provider value={{ recommendations, accept, reject }}>
      {children}
    </RecommendationContext.Provider>
  );
};

export const useRecommendation = () => {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error('useRecommendation must be used within a RecommendationProvider');
  }
  return context;
};
