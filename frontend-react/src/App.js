import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import NotificationPopup from './components/NotificationPopup';
import logoimage from './logoimage.jpeg';
import './footer.css';

function App() {
  const [form, setForm] = useState({
    StudentID: '',
    CGPA: '',
    Internships: '',
    Projects: '',
    'Workshops/Certifications': '',
    AptitudeTestScore: '',
    SoftSkillsRating: '',
    ExtracurricularActivities:'',
    PlacementTraining: '',
    SSC_Marks: '',
    HSC_Marks: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true); // true: show login, false: show signup
  const [notificationMessage, setNotificationMessage] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: parseFloat(value) });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validation: no empty or negative values
    for (const key in form) {
      if (form[key] === '' || form[key] === null || form[key] === undefined) {
        setNotificationMessage(`Please fill in the ${key} field.`);
        return;
      }
      if (typeof form[key] === 'number' && form[key] < 0) {
        setNotificationMessage(`The value for ${key} cannot be negative.`);
        return;
      }
    }

    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setPrediction(data);
    } catch (error) {
      console.error("Error while fetching prediction", error);
    }
  };

  const handleLogout = () => {
    setAuthUser(null);
    setPrediction(null);
    setNotificationMessage('Logged out successfully!');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <NotificationPopup message={notificationMessage} onClose={() => setNotificationMessage(null)} />
      {!authUser ? (
        showLogin ? (
          <LoginForm
            onLoginSuccess={username => {
              setAuthUser(username);
              setNotificationMessage('Login successful!');
            }}
            switchToSignup={() => setShowLogin(false)}
          />
        ) : (
          <SignupForm
            onSignupSuccess={() => {
              setNotificationMessage('Signup successful!');
              setShowLogin(true);
            }}
            switchToLogin={() => setShowLogin(true)}
          />
        )
      ) : (
        <>
          {/* Navbar */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'black',
            color: 'white',
            padding: '10px 20px',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logoimage} alt="Logo" style={{ borderRadius: '5px', marginRight: '15px', width: '40px', height: '40px' }} />
              <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>KMCE</h1>
            </div>
            <div>
              <span style={{ marginRight: '15px' }}>Welcome, {authUser}</span>
              <button onClick={handleLogout} style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>Logout</button>
            </div>
          </nav>

          {/* Marquee */}
          <style>
            {`
              @keyframes marquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
              }
            `}
          </style>
          <div style={{
            overflow: 'hidden',
            backgroundColor: 'add#e0e0e0',
            padding: '10px 0',
            marginBottom: '20px'
          }}>
            <div style={{
              whiteSpace: 'nowrap',
              display: 'inline-block',
              animation: 'marquee 15s linear infinite',
              fontWeight: 'bold',
              fontSize: '18px',
              color: '#333'
            }}>
              Welcome to our website - Predict Placement Results!
            </div>
          </div>

          {/* Form */}
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            backgroundColor: 'black',
            color: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 0 20px rgba(0,0,0,0.1)'
          }}>
            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {Object.keys(form).map(key => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '6px', fontWeight: '600' }}>{key}</label>
                    <input
                      type="number"
                      name={key}
                      value={form[key]}
                      onChange={handleChange}
                      step="any"
                      style={{
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        backgroundColor: '#00509e',
                        color: 'white'
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <button type="submit" style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '12px 24px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: 'none'
                }}>
                  Predict
                </button>
              </div>
            </form>
          </div>

          {/* Prediction Result */}
          {prediction && (
            <div style={{
              marginTop: '30px',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '20px',
                borderRadius: '10px',
                fontSize: '18px',
                fontWeight: 'bold',
                backgroundColor: prediction.prediction === 'Placed' ? '#d4edda' : '#f8d7da',
                color: prediction.prediction === 'Placed' ? '#155724' : '#721c24',
                border: `2px solid ${prediction.prediction === 'Placed' ? '#c3e6cb' : '#f5c6cb'}`
              }}>
                Student {prediction.StudentID} is {prediction.prediction === 'Placed' ? 'Placed 🙂' : 'Not Placed 🙁'}
              </div>
            </div>
          )}
          <footer className="footer" id="about-us">
            <div className="">
              <div className="row">
                <div className="footer-col"><h4 id="footer-name">Company</h4>
                  <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">About Us</a></li>
                  </ul>
                </div>
                <div className="footer-col"><h4 id="footer-name">Get Help</h4>
                  <ul>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">FAQ</a></li>
                  </ul>
                </div>
                <div className="footer-col"><h4 id="footer-name">Online Predictions</h4>
                  <ul>
                    <li><a href="#">Accurate</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">FAQ</a></li>
                  </ul>
                </div>
                <div className="footer-col"><h4 id="footer-name">Follow Us</h4>
                  <div className="social-links">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
