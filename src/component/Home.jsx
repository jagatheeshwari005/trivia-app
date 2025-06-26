// src/component/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  // ✅ Correct function name (was missing before)
  const handleGetStarted = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/quiz-setup');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="home-wrapper">
      <section className="hero-section">
        <div className="hero-text">
          <h1>
            Welcome to <span className="highlight">TriviaZone</span>
          </h1>
          <p className="hero-subtext">Test your brain. Learn while you play.</p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={handleGetStarted}>
              🎮 Get Started
            </button>
            <a href="#how-it-works" className="secondary-btn">
              📘 Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <h2>✨ Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              🕑 <strong>Timed Questions</strong>
              <p>Challenge yourself with countdown-based questions.</p>
            </div>
            <div className="feature-card">
              🔀 <strong>Random Quiz Generator</strong>
              <p>No quiz is ever the same.</p>
            </div>
            <div className="feature-card">
              📊 <strong>Scoreboard & Stats</strong>
              <p>Track your progress and compete with friends.</p>
            </div>
            <div className="feature-card">
              📚 <strong>Multiple Categories</strong>
              <p>Select quizzes from diverse topics and difficulty levels.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <h2>🚀 How It Works</h2>
          <div className="how-grid">
            <div className="step">
              <h3>1️⃣ Select Category</h3>
              <p>Choose from general knowledge, science, history, and more!</p>
            </div>
            <div className="step">
              <h3>2️⃣ Pick Difficulty</h3>
              <p>Go easy, medium, or hard — challenge yourself!</p>
            </div>
            <div className="step">
              <h3>3️⃣ Answer Questions</h3>
              <p>Each quiz has a timer. Pick the correct answer before time runs out.</p>
            </div>
            <div className="step">
              <h3>4️⃣ View Results</h3>
              <p>See your score, correct answers, and try again to improve!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
