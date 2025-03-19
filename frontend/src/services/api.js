import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchQuizzes = async (keyword, limit = 10, offset = 0) => {
  try {
    const response = await apiClient.get('/search', {
      params: { keyword, limit, offset }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching quizzes:', error);
    throw error;
  }
};

export const getQuizById = async (quizId) => {
  try {
    const response = await apiClient.get(`/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quiz ${quizId}:`, error);
    throw error;
  }
};
