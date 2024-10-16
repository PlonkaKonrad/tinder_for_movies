import axios from 'axios';
import movies from './dummyData.json';

const API_URL = 'https://example.com/recommendations';

// Helper function to log errors
const logError = (error: any) => {
    console.error('An error occurred:', error);
};

// Get movie recommendations
export const getRecommendations = async () => {
    try {
        const { data } = await axios.get(API_URL);
        return data || movies; // Fallback to dummy data if no data is returned
    } catch (error) {
        logError(error);
        return movies; // Fallback to dummy data in case of error
    }
};

// Accept a movie recommendation
export const acceptRecommendation = async (id: string) => {
    try {
        await axios.put(`${API_URL}/${id}/accept`);
        console.log(`Recommendation ${id} accepted`);
    } catch (error) {
        logError(error);
    }
};

// Reject a movie recommendation
export const rejectRecommendation = async (id: string) => {
    try {
        await axios.put(`${API_URL}/${id}/reject`);
        console.log(`Recommendation ${id} rejected`);
    } catch (error) {
        logError(error);
    }
};
