require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const predictRoute = require('./routes/predict');
const authRoute = require('./routes/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.use('/api/predict', predictRoute);
app.use('/api/auth', authRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Node server running on port ${PORT}`);
});
