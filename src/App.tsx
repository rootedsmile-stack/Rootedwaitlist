import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const joinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMsg(data.success ? "Welcome to Rooted!" : data.error);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', color: '#2d3436' }}>
      <h1>Rooted Oral Care</h1>
      <p>Back to the roots of dental health. High-performance, earth-derived ingredients.</p>
      
      <div style={{ marginTop: '30px', border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
        <h3>Join the Rooted Revolution</h3>
        <form onSubmit={joinWaitlist}>
          <input 
            type="email" 
            placeholder="email@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '10px', width: '250px' }} 
            required 
          />
          <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Join</button>
        </form>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}

export default App;
