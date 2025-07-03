import express from 'express';
import morgan from 'morgan';

import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

import cors from 'cors';
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // <-- Your frontend IP & port here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// Use morgan for request logging
app.use(morgan('dev'));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', routes);

// Catch malformed JSON
app.use((err, _, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Malformed JSON:', err.message);
    return res.status(400).json({ message: 'Invalid JSON format' });
  }
  next(err);
});

// Global error handler
app.use(errorHandler);

export default app;
