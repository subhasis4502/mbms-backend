import express from 'express';
import * as paymentController from '../controllers/payment.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// Apply authentication middleware to all routes
// router.use(authenticate);

// Create a new payment
router.post('/', paymentController.createPayment);

// Get all payments
router.get('/', paymentController.getAllPayments);

// Get last bank payment
router.get('/last', paymentController.getLastPayment);

// Get a single payment by ID
router.get('/:id', paymentController.getPaymentById);

// Update a payment
router.put('/:id', paymentController.updatePayment);

// Delete a payment
router.delete('/:id', authorize('admin'), paymentController.deletePayment);

// Get payments by source
router.get('/source/:source', paymentController.getPaymentsBySource);

// Get payments by status
router.get('/status/:status', paymentController.getPaymentsByStatus);

export default router;