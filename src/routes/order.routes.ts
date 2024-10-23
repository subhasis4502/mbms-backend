import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByPlatform,
  getOrdersByDeliveryStatus,
  getOrderByUsername,
  updateOrderStatus,
  updateProfitTransferStatus
} from '../controllers/order.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Create a new order
router.post('/', createOrder);

// Get all orders
router.get('/', getAllOrders);

// Get orders by username
router.get('/username/:username', getOrderByUsername);

// Get a single order by ID
router.get('/:id', getOrderById);

// Update an order
router.put('/:id', updateOrder);

// Delete an order
router.delete('/:id', authorize('admin'), deleteOrder);

// Get orders by platform
router.get('/platform/:platform', getOrdersByPlatform);

// Get orders by delivery status
router.get('/delivery/:status', getOrdersByDeliveryStatus);

// Update an order delivey status
router.put('/delivery/:id', updateOrderStatus);

// Update an order profit transfer status
router.put('/transfer/:id', updateProfitTransferStatus);

export default router;