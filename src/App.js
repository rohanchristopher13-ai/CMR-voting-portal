import React, { useState } from 'react';
import './App.css';

function App() {
  const [studentId, setStudentId] = useState('');
  const [candidate, setCandidate] = useState({});
  const [message, setMessage] = useState('');

  const categories = {
    President: ['Aditi', 'Rohan', 'Meena', 'Suhail', 'Kavya'],
    'Vice President': ['Karan', 'Sara', 'Nikhil', 'Rekha'],
    'General Secretary': ['Tanmay', 'Divya', 'Ritesh'],
    'Cultural Secretary': ['Pranav', 'Shruthi', 'Iqbal', 'Nina'],
    'Sports Secretary': ['Anil', 'Nisha'],
    'Tech Head': ['Sameer', 'Riya']
  };

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

      {/* Multi-category dropdowns */}
      {Object.entries(categories).map(([position, candidates]) => (
        <div key={position}>
          <h3>{position}</h3>
          <select
            value={candidate[position] || ''}
            onChange={(e) =>
              setCandidate({ ...candidate, [position]: e.target.value })
            }
          >
            <option value="">-- Select --</option>
            {candidates.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button onClick={vote}>Vote</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
