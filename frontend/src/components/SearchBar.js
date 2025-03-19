import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch, isLoading }) => {
  const [keyword, setKeyword] = useState('');
  const previousKeywordRef = useRef('');
  
  // Sử dụng useCallback để tránh tạo mới hàm handleDebouncedSearch sau mỗi lần render
  const handleDebouncedSearch = useCallback(
    (value) => {
      // Chỉ tìm kiếm khi từ khóa khác với tìm kiếm trước đó
      if (value && value !== previousKeywordRef.current) {
        previousKeywordRef.current = value;
        onSearch(value);
      }
    },
    [onSearch]
  );

  // Handle form submission for immediate search
  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim() && keyword !== previousKeywordRef.current) {
      previousKeywordRef.current = keyword;
      onSearch(keyword);
    }
  };

  // Sử dụng useEffect với logic cải tiến để tránh vòng lặp
  useEffect(() => {
    if (!keyword.trim()) return;

    // Tránh gọi search ngay khi component mount
    if (previousKeywordRef.current === '') {
      previousKeywordRef.current = keyword;
      return;
    }

    const timer = setTimeout(() => {
      // Chỉ tìm kiếm khi từ khóa đã thay đổi
      if (keyword !== previousKeywordRef.current) {
        handleDebouncedSearch(keyword);
      }
    }, 800); // Tăng thời gian debounce lên 800ms

    return () => clearTimeout(timer);
  }, [keyword, handleDebouncedSearch]);

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search for quiz questions..."
            disabled={isLoading}
            className="search-input"
          />
          <button 
            type="submit" 
            disabled={isLoading || !keyword.trim() || keyword === previousKeywordRef.current} 
            className="search-button"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      <div className="search-tips">
        <small>Gõ bất kỳ từ khóa nào để tìm kiếm. Ví dụ: "a", "Paris", "What"</small>
      </div>
    </div>
  );
};

export default SearchBar;
