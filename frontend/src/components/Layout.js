import React from 'react';
import '../styles/Layout.css';
import logoImage from '../assets/logo.png'; // Add this import

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src={logoImage} alt="Quiz Search Logo" className="logo-image" />
            <h1 className="logo-text">Quiz Search</h1>
          </div>
        </div>
      </header>
      
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Quiz Search App</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
