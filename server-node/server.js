
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const predictRoute = require('./routes/predict');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/predict', predictRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Node server running on port ${PORT}`);
});
