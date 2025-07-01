const express = require('express');
const routes = require('./routes'); 
const errorHandler = require('./middleware/errorHandler');
const morgan = require('morgan');

const app = express();


// Use morgan for request logging
app.use(morgan('dev')); // Logs method, URL, status code, and response time



// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', routes);


// Catch malformed JSON error (must be after json middleware and routes)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Malformed JSON:', err.message);
    return res.status(400).json({ message: 'Invalid JSON format' });
  }
  next(err); // Pass to global error handler if not a SyntaxError
});

// Global error handler (custom middleware)
app.use(errorHandler);

module.exports = app;
