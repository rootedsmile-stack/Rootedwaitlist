import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setMessage("You're on the list! Keep an eye on your inbox.");
        setEmail('');
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#0070f3', fontSize: '2.5rem' }}>SonicPure Oral Care</h1>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>
          We are reinventing the way you brush. Our bio-sonic technology reaches 
          where traditional bristles can't, ensuring a dentist-clean feeling every morning.
        </p>
      </header>

      <section style={{ background: '#f9f9f9', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
        <h3>Join the Exclusive Waitlist</h3>
        <p>Be the first to know when we launch and get 30% off your first order.</p>
        
        <form onSubmit={handleSignup} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '12px', 
              borderRadius: '6px', 
              border: 'none', 
              background: '#0070f3', 
              color: 'white', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Joining...' : 'Get Early Access'}
          </button>
        </form>
        {message && <p style={{ marginTop: '15px', color: '#0070f3' }}>{message}</p>}
      </section>
    </div>
  );
}

export default App;
