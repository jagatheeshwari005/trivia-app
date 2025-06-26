// src/components/Quiz.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles/Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();

  const category = params.get('category');
  const level = params.get('level');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/quiz/questions?category=${category}&level=${level}`);
        const data = await res.json();
        setQuestions(data); // assuming backend returns an array of questions
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };

    fetchQuestions();
  }, [category, level]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="quiz-container">
      <h2>Quiz: {category} - {level}</h2>
      {questions.length === 0 ? (
        <p>No questions found!</p>
      ) : (
        questions.map((q, i) => (
          <div key={i} className="question-card">
            <h3>{q.question}</h3>
            <ul>
              {(q.options || q.answers || []).map((opt, idx) => (
                <li key={idx}>{opt}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Quiz;
