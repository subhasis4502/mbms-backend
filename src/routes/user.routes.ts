import express from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { changePassword, deleteUser, getAllUsers, getUserById, getUserProfile, loginUser, registerUser, updateUserProfile } from '../controllers/user.controller';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (require authentication)
router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);
router.put('/change-password', authenticate, changePassword);

// Admin routes (require authentication and admin role)
router.get('/', authenticate, authorize('admin'), getAllUsers);
router.get('/:id', authenticate, authorize('admin'), getUserById);
router.delete('/:id', authenticate, authorize('admin'), deleteUser);

export default router;