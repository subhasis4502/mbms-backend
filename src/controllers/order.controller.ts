import { Request, Response } from 'express';
import { IOrder } from '../interfaces/order.interface';
import { Card, Order, User } from '../models';
import { CASHBACK_CARD } from '../constants/card.constants';
import { DELIVERY_STATUS } from '../constants/order.constants';

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
    try {
        const { deviceName, platform, orderId, card, quantity, pincode, amountPaid, profit, doneBy } = req.body;
        
        const cashBack = CASHBACK_CARD.includes(card) ? Math.floor(amountPaid * 0.05) : 0;
        const returnAmount = amountPaid-cashBack+profit;
        const commission = returnAmount - amountPaid;

        const cardDetails = await Card.findOne({ name: card });

        if (!cardDetails) {
            return res.status(404).json({ message: 'Card not found' });
        }

        const userDetails = await User.findOne({ username: doneBy })

        if (!userDetails) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newOrder: IOrder = new Order({
            deviceName,
            platform,
            orderId,
            card: cardDetails._id,
            cardName: card,
            quantity,
            pincode,
            amountPaid,
            returnAmount,
            doneBy: userDetails._id,
            doneByUser: userDetails.name,
            cashBack,
            commission,
            profit: "subhasis4502" === doneBy ? profit : profit / 2,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: 'Error creating order', error });
    }
};

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find().sort({ _id: -1});
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching orders', error });
    }
};

// Get a single order by ID
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id).populate('card').populate('doneBy');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching order', error });
    }
};

// Update an order
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: 'Error updating order', error });
    }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting order', error });
    }
};

// Get orders by username
export const getOrderByUsername = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const order = await Order.find({ doneBy: user._id });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching order', error });
    }
};

// Get orders by platform
export const getOrdersByPlatform = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ platform: req.params.platform }).populate('card').populate('doneBy');
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching orders by platform', error });
    }
};

// Get orders by delivery status
export const getOrdersByDeliveryStatus = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ delivery: req.params.status }).populate('card').populate('doneBy');
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching orders by delivery status', error });
    }
};

// Update an order status
export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { delivery, orderId } = req.body;

        if (!DELIVERY_STATUS.includes(delivery)) {
            return res.status(400).json({ message: 'Invalid delivery status' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                delivery: delivery,
                orderId: orderId,
                ...(delivery === 'Delivered' ? { deliveryDate: new Date() } : {})
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: 'Error updating order status', error });
    }
};