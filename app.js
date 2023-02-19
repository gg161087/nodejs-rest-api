const express = require('express');

const config = require('./src/config/config');
const userRoute = require('./src/routes/userRoute');
const authRoute = require('./routes/authRoute')

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api', userRoute);

// Start server
app.listen(config.port, () => {
  console.log(`Server running http://127.0.0.1:${config.port}`);
});