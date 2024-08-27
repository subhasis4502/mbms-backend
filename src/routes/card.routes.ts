import express from 'express';
import * as cardController from '../controllers/card.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// Apply authentication middleware to all routes
// router.use(authenticate);

// Create a new card
router.post('/', cardController.createCard);

// Get all cards
router.get('/', cardController.getAllCards);

// Get a single card by ID
router.get('/:id', cardController.getCardById);

// Update a card
router.put('/:id', cardController.updateCard);

// Delete a card (soft delete)
router.delete('/:id', authorize('admin'), cardController.deleteCard);

// Add a payment to a card
router.post('/payment', cardController.addPayment);

// Update current limit of a card
router.put('/limit', authorize('admin'), cardController.updateCurrentLimit);

export default router;