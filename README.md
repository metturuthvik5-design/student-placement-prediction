# 🎓 Student Placement Prediction System

An AI-powered Full Stack Web Application that predicts a student's placement chances using Machine Learning while providing secure authentication and an interactive user interface.

---

## 🚀 Overview

The Student Placement Prediction System helps estimate whether a student is likely to be placed based on academic performance, technical skills, and extracurricular activities.

The application combines a modern web interface with a machine learning model to provide real-time placement predictions.

---

## ✨ Features

- 🔐 User Authentication (Signup/Login)
- 👤 Secure JWT-based Authorization
- 📊 Real-time Placement Prediction
- 🤖 Machine Learning Integration
- 📱 Responsive React UI
- ☁️ Cloud Deployment Ready
- 🗄 MongoDB Database Integration
- 🔄 RESTful APIs
- 📈 Fast Prediction Response

---

# 🏗️ System Architecture

```
                  +---------------------+
                  |     React Frontend  |
                  |      (Vercel)       |
                  +----------+----------+
                             |
                 REST API Requests
                             |
          +------------------+------------------+
          |                                     |
          ▼                                     ▼
+-----------------------+           +-----------------------+
| Node.js + Express API |           | Flask ML API          |
| Authentication         |           | Prediction Model      |
| JWT                    |           | Scikit-Learn          |
| MongoDB                |           | Joblib Model          |
+-----------+------------+           +-----------+-----------+
            |                                    |
            ▼                                    ▼
      MongoDB Atlas                     Trained ML Model
```

---

# 🧠 Machine Learning

The prediction model is trained using student academic and placement-related attributes.

### Input Features

- CGPA
- Internships
- Projects
- Workshops / Certifications
- Aptitude Test Score
- Soft Skills Rating
- Placement Training
- SSC Percentage
- HSC Percentage
- Extracurricular Activities

### Output

- ✅ Placed
- ❌ Not Placed

---

# 💻 Tech Stack

## Frontend

- React.js
- Bootstrap
- Axios
- HTML5
- CSS3

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt.js

## Machine Learning

- Python
- Flask
- Scikit-learn
- Pandas
- NumPy
- Joblib

## Database

- MongoDB Atlas

## Deployment

- Vercel
- Render
- MongoDB Atlas

---

# 📂 Project Structure

```
student-placement-prediction/

│
├── frontend-react/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server-node/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   └── server.js
│
├── backend-flask/
│   ├── app.py
│   ├── model.pkl
│   ├── requirements.txt
│   └── Procfile
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/student-placement-prediction.git

cd student-placement-prediction
```

---

## Install Frontend

```bash
cd frontend-react

npm install

npm start
```

Runs on

```
http://localhost:3000
```

---

## Install Node Backend

```bash
cd server-node

npm install

npm start
```

Runs on

```
http://localhost:3001
```

---

## Install Flask Backend

```bash
cd backend-flask

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

python app.py
```

Runs on

```
http://localhost:5000
```

---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/signup | Register User |
| POST | /api/auth/login | User Login |

## Prediction

| Method | Endpoint |
|---------|----------|
| POST | /predict |

---

# 📊 Workflow

```
User

↓

Signup/Login

↓

JWT Authentication

↓

Enter Student Details

↓

Flask ML API

↓

Machine Learning Model

↓

Prediction Result

↓

Displayed on React Dashboard
```

---

# 🔒 Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- CORS Enabled
- Environment Variables for Sensitive Data

---

# 🌐 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| ML API | Render |
| Database | MongoDB Atlas |

---

# 📸 Screenshots

> Add screenshots here

- Login Page
- Signup Page
- Prediction Dashboard
- Prediction Result

---

# 🔮 Future Enhancements

- Resume Analysis
- Company Recommendation
- Placement Analytics Dashboard
- Admin Portal
- Student Performance Visualization
- Explainable AI Predictions
- Email Notifications
- Resume Upload & Parsing

---

# 👨‍💻 Author

**Mettu Ruthvik**

B.Tech Computer Science Engineering

Keshav Memorial College of Engineering

GitHub: https://github.com/metturuthvik5-design

LinkedIn: *(Add your LinkedIn profile)*

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.
