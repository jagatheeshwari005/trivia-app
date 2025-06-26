// src/component/QuizSetupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizSetupPage.css';

const QuizSetupPage = () => {
  const [category, setCategory] = useState('9'); // Default: General Knowledge
  const [difficulty, setDifficulty] = useState('easy'); // Default: easy
  const navigate = useNavigate();

  const handleStart = () => {
    // Fallbacks for safety
    const safeCategory = category || '9';
    const safeDifficulty = difficulty || 'easy';
    if (!safeCategory || !safeDifficulty) {
      alert('Please select both category and difficulty.');
      return;
    }
    navigate(`/quiz?category=${safeCategory}&level=${safeDifficulty}`);
  };

  return (
    <div className="quiz-setup-container">
      <h2>🎯 Setup Your Quiz</h2>

      <div className="form-group">
        <label htmlFor="category">Select Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
          <option value="17">Science & Nature</option>
          <option value="18">Computers</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="difficulty">Select Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button onClick={handleStart} className="start-btn">
        🚀 Start Quiz
      </button>
    </div>
  );
};

export default QuizSetupPage;
