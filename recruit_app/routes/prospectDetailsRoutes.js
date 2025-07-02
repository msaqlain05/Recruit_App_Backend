import express from 'express';
import { getProspectDetails } from '../controllers/prospectDetailsController.js';

const router = express.Router();

router.get('/', getProspectDetails); // GET /api/prospect-details

export default router; 