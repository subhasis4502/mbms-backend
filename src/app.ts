import express from 'express';
import connectDB from './config/database';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Route imports
import userRoutes from './routes/user.routes';
import cardRoutes from './routes/card.routes';
import orderRoutes from './routes/order.routes';
import paymentRoutes from './routes/payment.routes';

// Load environment variables
dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));