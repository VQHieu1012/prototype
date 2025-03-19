import React, { createContext, useState, useEffect } from 'react';
import { loginUser, getUserProfile, logoutUser } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Fetch user data if token exists
          const userData = await getUserProfile();
          setCurrentUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Token might be invalid or expired
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (username, password) => {
    const response = await loginUser(username, password);
    const { token, user } = response;
    
    // Save token to localStorage
    localStorage.setItem('authToken', token);
    
    // Update context state
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    return user;
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutUser(); // Call API to invalidate token (optional)
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clean up local storage and state regardless of API response
      localStorage.removeItem('authToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };

  const contextValue = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
