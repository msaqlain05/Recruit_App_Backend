import { Router } from 'express';
import { createSchool } from '../controllers/schoolController.js';

const router = Router();

// Create a new school
router.post('/', createSchool);

export default router;
