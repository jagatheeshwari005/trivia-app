import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Result.css";
import { useNavigate, useLocation } from "react-router-dom";

const Result = () => {
  const [result, setResult] = useState(null);
  const [rank, setRank] = useState(null);
  const [personalBest, setPersonalBest] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userAnswers = [], score = 0, timeTaken = 0, total = 5, username: navUsername = '', email: navEmail = '', category: navCategory = '', difficulty: navDifficulty = '' } = location.state || {};

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log('Token used for /api/results:', token);
        const res = await axios.get("http://localhost:5000/api/results", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResult(res.data);
        // Fetch leaderboard to get rank
        const lb = await axios.get("http://localhost:5000/api/results/leaderboard");
        const idx = lb.data.findIndex(r => r.email === res.data.email && r.score === res.data.score && r.timeTaken === res.data.timeTaken);
        setRank(idx >= 0 ? idx + 1 : null);
        // Check for personal best (highest score for this user/category/difficulty)
        const userResults = lb.data.filter(r => r.email === res.data.email && r.category === res.data.category && r.difficulty === res.data.difficulty);
        if (userResults.length && userResults[0].score === res.data.score) setPersonalBest(true);
      } catch (err) {
        console.error('Error fetching /api/results:', err);
        setResult({ username: '', email: '', category: '', difficulty: '', score, timeTaken });
      }
    };
    fetchResult();
  }, [navigate, score, timeTaken]);

  if (!result) return <p>Loading your result...</p>;

  const percent = Math.round((score / total) * 100);
  const highScore = percent >= 80;

  return (
    <div className="result-container">
      {highScore && <div className="confetti">🎉</div>}
      <h2>🎉 Your Quiz Result</h2>
      <div className="progress-bar" style={{ width: '100%', background: '#eee', borderRadius: 8, margin: '1rem 0' }}>
        <div style={{ width: `${percent}%`, background: '#6c63ff', height: 12, borderRadius: 8 }}></div>
      </div>
      <p><strong>User:</strong> {result.username || navUsername || result.email || navEmail}</p>
      <p><strong>Category:</strong> {result.category || navCategory}</p>
      <p><strong>Difficulty:</strong> {result.difficulty || navDifficulty}</p>
      <p><strong>Score:</strong> {score} / {total} ({percent}%)</p>
      <p><strong>Time Taken:</strong> {timeTaken} seconds</p>
      {rank && <p><strong>Your Rank:</strong> #{rank}</p>}
      {personalBest && <p style={{ color: 'green' }}>🏅 Personal Best!</p>}
      <button onClick={() => navigate("/quiz-setup")}>Try Again</button>
      <button onClick={() => navigate("/leaderboard")} style={{marginLeft: '1rem'}}>View Leaderboard</button>
      <button onClick={() => navigator.share ? navigator.share({ text: `I scored ${score}/${total} on TriviaZone!` }) : alert('Sharing not supported.')} style={{marginLeft: '1rem'}}>Share</button>
      <h3 style={{ marginTop: '2rem' }}>Question Review</h3>
      <ul style={{ padding: 0 }}>
        {userAnswers.map((ua, i) => (
          <li key={i} style={{ marginBottom: 16, listStyle: 'none', background: '#f6f6f6', borderRadius: 8, padding: 12 }}>
            <div dangerouslySetInnerHTML={{ __html: `<strong>Q${i + 1}:</strong> ${ua.question}` }} />
            <ul style={{ paddingLeft: 0 }}>
              {ua.answers.map((ans, idx) => (
                <li key={idx} style={{
                  display: 'inline-block',
                  marginRight: 10,
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: ans === ua.correct ? '#d4edda' : (ans === ua.selected ? '#f8d7da' : '#fff'),
                  color: ans === ua.correct ? '#155724' : (ans === ua.selected ? '#721c24' : '#333'),
                  fontWeight: ans === ua.correct || ans === ua.selected ? 'bold' : 'normal',
                  border: ans === ua.selected ? '1px solid #721c24' : 'none',
                }}>
                  <span dangerouslySetInnerHTML={{ __html: ans }} />
                  {ans === ua.correct ? ' ✔️' : ''}
                  {ans === ua.selected && ans !== ua.correct ? ' ❌' : ''}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {userAnswers.some(ua => ua.selected !== ua.correct) && (
        <button onClick={() => {
          const missed = userAnswers.filter(ua => ua.selected !== ua.correct);
          localStorage.setItem('retryQuestions', JSON.stringify(missed));
          navigate('/quiz', { state: { retry: true } });
        }} style={{marginTop: '1rem'}}>Retry Missed Questions</button>
      )}
    </div>
  );
};

export default Result;
