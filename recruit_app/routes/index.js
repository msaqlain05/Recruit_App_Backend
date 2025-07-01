// routes/index.js
const express = require('express');
const router = express.Router();

// Import individual route files
const authRoutes = require('./authRoutes');

router.use('/auth', authRoutes);

module.exports = router;
