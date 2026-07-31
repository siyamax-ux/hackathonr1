import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getApiUrl, getSocketUrl } from '../config/api';

// Connect to backend socket
const socket = io(getSocketUrl());

export default function TeacherDashboard() {
  // Common State
  const [currentTopic, setCurrentTopic] = useState('Recursion & Call Stack');
  const [feedbackCounts, setFeedbackCounts] = useState({ understood: 0, somewhat: 0, confused: 0 });
  const [totalStudents, setTotalStudents] = useState(0);

  // State for Endpoint A (AI Advice)
  const [aiAdvice, setAiAdvice] = useState('');
  const [confusedPercentage, setConfusedPercentage] = useState(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  // State for Endpoint B (Quiz Generator)
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  // Listen for real-time WebSocket updates
  useEffect(() => {
    socket.on('state-update', (data) => {
      if (data.currentTopic) setCurrentTopic(data.currentTopic);
      if (data.feedbackCounts) setFeedbackCounts(data.feedbackCounts);
      if (data.totalStudents) setTotalStudents(data.totalStudents);
    });

    return () => socket.off('state-update');
  }, []);

  // -------------------------------------------------------------
  // ENDPOINT A: Get Live AI Co-Pilot Advice
  // -------------------------------------------------------------
  const handleFetchAiAdvice = async () => {
    setLoadingAdvice(true);
    try {
      const response = await fetch(getApiUrl('/api/copilot/analyze'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: currentTopic,
          counts: feedbackCounts,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAiAdvice(data.aiAdvice);
        setConfusedPercentage(data.confusedPercentage);
      }
    } catch (error) {
      console.error('Error fetching AI advice:', error);
    } finally {
      setLoadingAdvice(false);
    }
  };

  // -------------------------------------------------------------
  // ENDPOINT B: Generate Instant 2-Minute Quiz
  // -------------------------------------------------------------
  const handleGenerateQuiz = async () => {
    setLoadingQuiz(true);
    try {
      const response = await fetch(getApiUrl('/api/copilot/generate-quiz'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: currentTopic }),
      });

      const data = await response.json();
      if (data.success) {
        // Parse the raw JSON string returned by the backend
        const parsedQuiz = JSON.parse(data.rawQuiz);
        setQuizQuestions(parsedQuiz);
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
    } finally {
      setLoadingQuiz(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Teacher Dashboard</h1>
      <h3>Topic: {currentTopic}</h3>
      <p>Total Active Students: {totalStudents}</p>

      {/* Live Feedback Counts */}
      <div style={{ display: 'flex', gap: '16px', margin: '20px 0' }}>
        <div>😊 Understood: {feedbackCounts.understood}</div>
        <div>😐 Somewhat: {feedbackCounts.somewhat}</div>
        <div>😕 Confused: {feedbackCounts.confused}</div>
      </div>

      <hr />

      {/* SECTION A: AI Advice Button & Display */}
      <div style={{ margin: '20px 0' }}>
        <button onClick={handleFetchAiAdvice} disabled={loadingAdvice}>
          {loadingAdvice ? 'Analyzing...' : '💡 Get Live AI Advice'}
        </button>

        {confusedPercentage !== null && (
          <div style={{ marginTop: '12px', background: '#fff3cd', padding: '12px', borderRadius: '6px' }}>
            <strong>Confused Rate: {confusedPercentage}%</strong>
            <p>{aiAdvice}</p>
          </div>
        )}
      </div>

      <hr />

      {/* SECTION B: Quiz Generator Button & Display */}
      <div style={{ margin: '20px 0' }}>
        <button onClick={handleGenerateQuiz} disabled={loadingQuiz}>
          {loadingQuiz ? 'Generating...' : '⚡ Generate 2-Min Quiz'}
        </button>

        {quizQuestions.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <h3>Generated Quiz Questions:</h3>
            {quizQuestions.map((q, idx) => (
              <div key={idx} style={{ background: '#f8f9fa', padding: '12px', marginBottom: '8px', borderRadius: '6px' }}>
                <p><strong>Q{idx + 1}: {q.question}</strong></p>
                <ul>
                  {q.options.map((opt, oIdx) => (
                    <li key={oIdx}>{opt} {opt === q.answer ? '(Correct)' : ''}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
