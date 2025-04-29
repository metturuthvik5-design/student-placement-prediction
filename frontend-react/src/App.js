import React, { useState } from 'react';
import axios from 'axios';

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

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: parseFloat(value) });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/predict', form);
      setPrediction(res.data);
    } catch (error) {
      console.error("Error while fetching prediction", error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white',
        padding: '10px 20px'
      }}>
        <img src="https://via.placeholder.com/50" alt="Logo" style={{ borderRadius: '5px', marginRight: '15px' }} />
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>College Name</h1>
      </nav>

      {/* Marquee */}
      <div style={{
        overflow: 'hidden',
        backgroundColor: '#e0e0e0',
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
    </div>
  );
}

export default App;
