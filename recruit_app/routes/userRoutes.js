// routes/userRoutes.js
import { Router } from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// only authenticated users (like superadmin) can view list
router.get('/', authenticateToken, getAllUsers);

export default router;
