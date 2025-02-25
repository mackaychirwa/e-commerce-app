import express from 'express';
import expressListEndpoints from 'express-list-endpoints';
import logger from './src/logs/logger.js';
import { connectDB } from './src/config/database.js';
import allRoutes from "./src/routes/api.mjs"
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 3000 
// Set up global logger
global.logger = logger;

app.use(cors({
  origin: "http://localhost:3001", 
  credentials: true,  
}));
app.use(express.json());


app.use(cookieParser());
//swagger ui
app.use('/api', allRoutes);

const endpoints = expressListEndpoints(app);
console.log(endpoints);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    logger.info(`Server started on port ${PORT}`);
});

connectDB();