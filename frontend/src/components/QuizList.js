import React from 'react';
import QuizResult from './QuizResult';
import '../styles/QuizList.css';

const QuizList = ({ quizzes, searchTerm }) => {
  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="quiz-list-empty">
        {searchTerm ? (
          <p>No results found for "{searchTerm}". Try a different keyword.</p>
        ) : (
          <p>Enter a keyword to search for quiz questions.</p>
        )}
      </div>
    );
  }

  return (
    <div className="quiz-list">
      <h2>Search Results for: "{searchTerm}"</h2>
      <p className="results-count">{quizzes.length} questions found</p>
      
      <div className="quiz-items">
        {quizzes.map((quiz) => (
          <QuizResult key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizList;
