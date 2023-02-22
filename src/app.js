import express from 'express';
import morgan from 'morgan';
import config from './config';
//import Routes
import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';

const app = express();

//Settings
app.set('port', config.port);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', userRoute);
app.use('/api', authRoute);

export default app; 