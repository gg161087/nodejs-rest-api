import express from 'express';
import morgan from 'morgan';
import config from './config';
//import Routes
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import dependencesRoutes from "./routes/dependences.routes";
import countriesRoutes from "./routes/countries.routes";
import districtsRoutes from "./routes/districts.routes";
import driversRoutes from "./routes/drivers.routes";
import locationsRoutes from "./routes/locations.routes";
import provincesRoutes from "./routes/provinces.routes";
import situationsRoutes from "./routes/situations.routes";
import types_docsRoutes from "./routes/types_docs.routes";

const app = express();

//Settings
app.set('port', config.port);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', authRoutes);
app.use("/api/dependences", dependencesRoutes);
app.use("/api/countries", countriesRoutes);
app.use("/api/districts", districtsRoutes);
app.use("/api/drivers", driversRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/provinces", provincesRoutes);
app.use("/api/situations", situationsRoutes);
app.use("/api/types_docs", types_docsRoutes);

export default app; 