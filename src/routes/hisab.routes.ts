import express from 'express';
import * as hisabController from '../controllers/hisab.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Create a new hisab
router.post('/', hisabController.createHisab);

// Get all hisabs
router.get('/', hisabController.getAllHisabs);

// Get last hisab
router.get('/last', hisabController.getLastHisab);

// Update a hisab
router.put('/:id', hisabController.updateHisab);

export default router;