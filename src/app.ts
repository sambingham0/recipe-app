import express, { Application } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import './config/passport';
import recipeRoutes from './routes/recipeRoutes';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/swagger.json';
import { errorHandler, notFound } from './middleware/errorHandler';

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

// Passport init (after session)
app.use(passport.initialize());
app.use(passport.session());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


// Routes
app.use('/recipes', recipeRoutes);
app.use('/auth', require('./routes/authRoutes').default);


//default placeholder
app.get('/', (_req, res) => {
  res.send('Recipe API is running successfully!');
});

// 404 and error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
