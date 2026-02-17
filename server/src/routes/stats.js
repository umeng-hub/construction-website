import express from 'express';
import { getHomeStats } from '../controllers/statsController.js';

const router = express.Router();

// Get homepage statistics
router.get('/home', getHomeStats);

export default router;
