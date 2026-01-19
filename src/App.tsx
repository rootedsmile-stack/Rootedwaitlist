import React, { useState } from 'react';
import './index.css';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Joining...');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ email, name }),
      });
      if (res.ok) setStatus('Welcome to the revolution!');
      else setStatus('Try again shortly.');
    } catch {
      setStatus('Error connecting to server.');
    }
  };

  return (
    <div className="landing-wrapper">
      <header>
        <div className="logo">RootedSmile</div>
        <nav style={{ display: 'flex', gap: '30px', fontWeight: 500 }}>
          <span>Product</span>
          <span>Our Mission</span>
          <button style={{ background: '#4a5d4e', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '20px' }}>Join</button>
        </nav>
      </header>

      <section className="hero-card">
        <div className="hero-image-side">
          {/* Your paper tube image will appear here via CSS */}
        </div>
        
        <div className="hero-content-side">
          <h1>Brighter Smiles, <br/>Rooted in Nature</h1>
          <p>Experience the future of oral wellness with earth-derived science in our signature RootedSmile paper tube.</p>
          
          <div className="waitlist-card">
            <h3>Join the Rooted Revolution</h3>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>Be the first to experience the power of nature and receive 30% off your first order.</p>
            <form onSubmit={handleJoin}>
              <input 
                type="text" 
                placeholder="Full Name" 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <button type="submit" className="btn-primary">Get Early Access</button>
            </form>
            {status && <p style={{ textAlign: 'center', marginTop: '10px' }}>{status}</p>}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-item">🍃<br/><strong>Natural Ingredients</strong></div>
        <div className="feature-item">🛡️<br/><strong>Scientifically Proven</strong></div>
        <div className="feature-item">♻️<br/><strong>Eco-Friendly Packaging</strong></div>
      </section>
    </div>
  );
}

export default App;
