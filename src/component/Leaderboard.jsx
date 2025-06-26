import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Result.css';

const Leaderboard = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/results/leaderboard');
        setResults(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert('Failed to load leaderboard');
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;

  return (
    <div className="result-container">
      <h2>🏆 Leaderboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Email</th>
            <th>Category</th>
            <th>Difficulty</th>
            <th>Score</th>
            <th>Time (s)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={r._id || i}>
              <td>{i + 1}</td>
              <td>{r.email}</td>
              <td>{r.category}</td>
              <td>{r.difficulty}</td>
              <td>{r.score}</td>
              <td>{r.timeTaken}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard; 