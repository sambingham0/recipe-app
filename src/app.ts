import express, { Application } from 'express';
import cors from 'cors';
import session from 'express-session';
import recipeRoutes from './routes/recipeRoutes';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/swagger.json';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


// Routes
app.use('/recipes', recipeRoutes);

export default app;
