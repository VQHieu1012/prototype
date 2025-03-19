import React, { useState } from 'react';
import '../styles/QuizResult.css';

const QuizResult = ({ quiz }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="quiz-result">
      <div className="quiz-question">
        <h3>Question:</h3>
        <p>{quiz.quiz_name}</p>
      </div>
      
      <div className="quiz-answer-container">
        {showAnswer ? (
          <div className="quiz-answer">
            <h3>Answer:</h3>
            <p>{quiz.answer}</p>
          </div>
        ) : (
          <button 
            className="show-answer-btn" 
            onClick={() => setShowAnswer(true)}
          >
            Show Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizResult;
