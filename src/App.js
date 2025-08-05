import React, { useState } from 'react';
import './App.css';

function App() {
  const [studentId, setStudentId] = useState('');
  const [candidate, setCandidate] = useState('');
  const [message, setMessage] = useState('');

  const vote = async () => {
    const response = await fetch('/.netlify/functions/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, candidate }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="container">
      <h1>CMR Voting Portal</h1>
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <select value={candidate} onChange={(e) => setCandidate(e.target.value)}>
        <option value="">Select Candidate</option>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Charlie">Charlie</option>
      </select>
      <button onClick={vote}>Vote</button>
      <p>{message}</p>
    </div>
  );
}

export default App;