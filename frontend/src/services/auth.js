import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configure axios to include token in headers
const authAxios = axios.create({
  baseURL: API_URL
});

// Add request interceptor to include auth token in headers
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login user and get token
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get current user profile
export const getUserProfile = async () => {
  try {
    const response = await authAxios.get(`${API_URL}/auth/user`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await authAxios.post(`${API_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Register a new user (if needed)
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  loginUser,
  getUserProfile,
  logoutUser,
  registerUser
};
