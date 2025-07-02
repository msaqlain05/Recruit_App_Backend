// routes/index.js
import { Router } from 'express';

// Import individual route files
import authRoutes from './authRoutes.js';
import schoolRoutes from './schoolRoutes.js';
// import userDetailsRoutes from './userDetailsRoutes.js';
import prospectDetailsRoutes from './prospectDetailsRoutes.js';
import prospectRoutes from './prospectRoutes.js';

const router = Router();

// Mount route handlers
router.use('/auth', authRoutes);
router.use('/schools', schoolRoutes);
router.use('/user-details', prospectDetailsRoutes);
router.use('/prospects', prospectRoutes);
router.use('/prospect-details', prospectDetailsRoutes);

export default router;
