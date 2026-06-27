import React, { useState } from 'react';
import axios from 'axios';
import NotificationPopup from './NotificationPopup';

function SignupForm({ onSignupSuccess, switchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSignup = async e => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post('http://localhost:3001/api/auth/signup', { username, email, password });
      if (res.status === 201) {
        setSuccessMessage('Signup successful!');
        onSignupSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <>
      <NotificationPopup message={successMessage} onClose={() => setSuccessMessage(null)} />
      <div style={{
        maxWidth: '400px',
        margin: '40px auto',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#f0f4f8',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: 'relative'
      }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Create an Account</h2>
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#555' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#555' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#555' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          {error && <div style={{ color: 'red', marginBottom: '18px', textAlign: 'center' }}>{error}</div>}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#007bff',
              color: 'white',
              fontSize: '18px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            Sign Up
          </button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
          Already have an account?{' '}
          <button
            onClick={switchToLogin}
            style={{
              color: '#007bff',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontWeight: '600'
            }}
          >
            Log in here
          </button>
        </p>
      </div>
    </>
  );
}

export default SignupForm;
