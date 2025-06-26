import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './QuizPage.css';

const TIMER_SECONDS = 15;

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [userAnswers, setUserAnswers] = useState([]);

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const category = params.get('category');
  const difficulty = params.get('level');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        if (!res.data.results || res.data.results.length === 0) {
          alert('No questions found for the selected category and difficulty. Please try different options.');
          setLoading(false);
          return;
        }
        const formatted = res.data.results.map(q => {
          const answers = [...q.incorrect_answers];
          const randIndex = Math.floor(Math.random() * 4);
          answers.splice(randIndex, 0, q.correct_answer);
          return {
            question: q.question,
            correct: q.correct_answer,
            answers,
          };
        });
        setQuestions(formatted);
        setLoading(false);
        setTimer(TIMER_SECONDS);
        setCurrent(0);
        setScore(0);
        setUserAnswers([]);
      } catch (err) {
        alert("Failed to fetch questions");
        setLoading(false);
      }
    };
    fetchQuestions();
    // eslint-disable-next-line
  }, [category, difficulty]);

  // Timer logic
  useEffect(() => {
    if (loading || showFeedback) return;
    if (timer === 0) {
      handleAnswer(null); // Auto-advance if time runs out
      return;
    }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, loading, showFeedback]);

  useEffect(() => {
    setTimer(TIMER_SECONDS);
    setSelected(null);
    setShowFeedback(false);
  }, [current]);

  const handleAnswer = (answer) => {
    if (showFeedback) return;
    setSelected(answer);
    setShowFeedback(true);
    setUserAnswers(prev => [
      ...prev,
      {
        question: questions[current].question,
        answers: questions[current].answers,
        correct: questions[current].correct,
        selected: answer,
      },
    ]);
    if (answer === questions[current].correct) {
      setScore(s => s + 1);
    }
    setTimeout(async () => {
      if (current + 1 < questions.length) {
        setCurrent(c => c + 1);
      } else {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        const token = localStorage.getItem('token');
        try {
          if (token) {
            await axios.post(
              'http://localhost:5000/api/results',
              {
                category,
                difficulty,
                score,
                timeTaken,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
        } catch (err) {
          console.error('Failed to save result to backend.', err);
          alert('Failed to save your result, but you can still see it!');
        } finally {
          navigate('/result', {
            state: {
              score,
              timeTaken,
              total: questions.length,
              category,
              difficulty,
              userAnswers,
            }
          });
        }
      }
    }, 1200);
  };

  if (loading || questions.length === 0 || !questions[current]) return <p>Loading Questions...</p>;

  return (
    <div className="quiz-page">
      <h2>Question {current + 1} of {questions.length}</h2>
      <div className="timer">⏱️ {timer}s</div>
      {questions[current] ? (
        <>
          <p dangerouslySetInnerHTML={{ __html: questions[current].question }} />
          <div className="answers">
            {questions[current].answers.map((ans, i) => {
              let btnClass = 'answer-btn';
              if (showFeedback) {
                if (ans === questions[current].correct) btnClass += ' correct';
                else if (ans === selected) btnClass += ' wrong';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(ans)}
                  dangerouslySetInnerHTML={{ __html: ans }}
                  className={btnClass}
                  disabled={showFeedback}
                />
              );
            })}
          </div>
        </>
      ) : (
        <p>Loading question...</p>
      )}
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default QuizPage; 