import express from 'express';
import { createProspect } from '../controllers/prospectController.js';

const router = express.Router();

// POST /api/prospects
router.post('/', createProspect);

export default router;
