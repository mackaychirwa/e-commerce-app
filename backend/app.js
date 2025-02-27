import express from 'express';
import expressListEndpoints from 'express-list-endpoints';
import logger from './src/logs/logger.js';
import { connectDB } from './src/config/database.js';
import allRoutes from "./src/routes/api.mjs"
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

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
//
app.use('/uploads', express.static(path.join(process.cwd(), 'src/uploads')));
app.use('/api', allRoutes);
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API',
      version: '1.0.0',
      description: 'API for managing products, categories, users and reviews.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/routes/v1/**/*.mjs'],
}

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const endpoints = expressListEndpoints(app);
console.log(endpoints);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    logger.info(`Server started on port ${PORT}`);
});

connectDB();