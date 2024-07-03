// Import necessary modules
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sequelize } from './config/database'; // Import Sequelize instance
import routes from './routes'; // Import your API routes
import { notFound, errorHandler } from './middlewares/errorMiddleware'; // Import error handling middleware
import path from 'path';

// Import Swagger dependencies
import swaggerUi from 'swagger-ui-express';
import * as swaggerFile from '../swagger-output.json'; // Adjust path as necessary

dotenv.config(); // Load environment variables

const app = express(); // Create Express app

app.use(cors()); // Enable CORS

app.use(bodyParser.json()); // Parse JSON bodies

// Serve Swagger UI at /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
  res.send({message: "Welcom to API end"})
})

// Define API routes
app.use('/api', routes);

// Middleware for handling 404 errors (Not Found)
app.use(notFound);

// Middleware for handling errors
app.use(errorHandler);

// Sync Sequelize models with the database and start server
sequelize.sync().then(() => {
  console.log('Database connected');
});

export { app }; // Export the Express app
