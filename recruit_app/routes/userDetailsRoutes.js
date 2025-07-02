import { Router } from 'express';
import { createUserDetails } from '../controllers/userDetailsController.js';

const router = Router();

// Create user details
router.post('/', createUserDetails);

export default router;
