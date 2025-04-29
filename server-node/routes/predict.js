
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:5000/predict', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Prediction failed', details: error.message });
  }
});

module.exports = router;
