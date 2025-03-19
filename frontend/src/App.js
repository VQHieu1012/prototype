import React, { useState, useCallback } from 'react';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import QuizList from './components/QuizList';
import { searchQuizzes } from './services/api';
import './styles/main.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sử dụng useCallback để tránh tạo mới hàm handleSearch sau mỗi lần render
  const handleSearch = useCallback(async (keyword) => {
    // Tránh tìm kiếm lại với cùng từ khóa
    if (isLoading || keyword === searchTerm) return;
    
    setIsLoading(true);
    setError(null);
    setSearchTerm(keyword);

    try {
      const result = await searchQuizzes(keyword);
      if (result.success) {
        setSearchResults(result.data);
      } else {
        setError(result.message || 'An error occurred during search');
        setSearchResults([]);
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, isLoading]);

  return (
    <Layout>
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      
      {error && <div className="error-message">{error}</div>}
      
      {isLoading ? (
        <div className="loading-container">
          <p>Searching for quiz questions...</p>
        </div>
      ) : (
        <QuizList quizzes={searchResults} searchTerm={searchTerm} />
      )}
    </Layout>
  );
}

export default App;
