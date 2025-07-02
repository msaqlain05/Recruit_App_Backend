import express from 'express';
import { getProspectDetails } from '../controllers/prospectDetailsController.js';
import { createProspectDetails } from '../controllers/prospectDetailsController.js';
import { authenticateToken  } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', authenticateToken , getProspectDetails); // GET /api/prospect-details
router.post('/', createProspectDetails);

export default router; 