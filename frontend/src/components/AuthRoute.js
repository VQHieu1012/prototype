import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

// Component to protect routes that require authentication
const AuthRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // If authenticated, render the child routes
  // Otherwise, redirect to login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
