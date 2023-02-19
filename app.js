const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/config/config');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

// Middleware to parse request body as JSON
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

// Start server
app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});