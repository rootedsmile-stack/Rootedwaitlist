import React, { useState } from 'react';
import './index.css';

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.success ? "You're on the list!" : "Error: " + data.error);
  };

  return (
    <div className="container">
      <nav>
        <div className="logo">RootedSmile</div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-text">
            <h1>Brighter Smiles, <br/>Rooted in Nature.</h1>
            <p>Experience the future of oral wellness. Our new whitening powder comes in a 100% biodegradable <strong>RootedSmile paper tube</strong>.</p>
            
            <form onSubmit={handleSignup} className="waitlist-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <button type="submit">Get Early Access</button>
            </form>
            {message && <p className="status-msg">{message}</p>}
          </div>

          <div className="product-visual">
            <div className="paper-tube-mock">
               {/* This represents your paper tube box */}
               <div className="tube-label">RootedSmile</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
