//component/About.jsx

import React, { useEffect, useState } from 'react';
import './About.css';

const About = () => {
  const [gradientIndex, setGradientIndex] = useState(0);

  const gradients = [
    'linear-gradient(135deg, #1e3c72, #2a5298)',     // dark blue
    'linear-gradient(135deg, #3a1c71, #d76d77)',     // purple to pink
    'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', // deep ocean
    'linear-gradient(135deg, #42275a, #734b6d)',     // wine shades
    'linear-gradient(135deg, #232526, #414345)',     // charcoal
    'linear-gradient(135deg, #1c1c1c, #434343)',     // dark silver
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex(prev => (prev + 1) % gradients.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-page">
      <div
        className="about-container"
        style={{ background: gradients[gradientIndex] }}
      >
        <h1>About the Trivia Quiz</h1>

        <p>
          Welcome to the Trivia Quiz App! This app is designed to test your general knowledge with fun and interesting multiple-choice questions.
        </p>

        <h2>🎯 How to Play</h2>
        <ul>
          <li>Click the <strong>Start Quiz</strong> button on the home page.</li>
          <li>Each question has 4 options — only one is correct.</li>
          <li>Select an answer by clicking on it.</li>
          <li>Once you select an answer, you'll immediately move to the next question.</li>
          <li>At the end of the quiz, your score will be shown.</li>
        </ul>

        <h2>📋 Rules</h2>
        <ul>
          <li>You can't go back to previous questions.</li>
          <li>Each quiz consists of 5 random questions.</li>
          <li>Try to get the highest score you can!</li>
        </ul>

        <p>Have fun and challenge yourself! 🎉</p>
      </div>
    </div>
  );
};

export default About;
