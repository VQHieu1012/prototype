import React from 'react';
import '../styles/Layout.css';

// Use a logo URL that definitely exists or handle the case where it might not exist
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <div className="logo">
            {/* Use a text-based logo with an optional image if available */}
            <div className="logo-icon">Q</div>
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
