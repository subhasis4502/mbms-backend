import { Request, Response } from 'express';
import Payment from '../models/payment.model';
import { IPayment } from '../interfaces/payment.interface';
import { Card } from '../models';
import mongoose from 'mongoose';

// Create a new payment
export const createPayment = async (req: Request, res: Response) => {
    try {
        const { source, type, amount } = req.body;
        const newPayment = new Payment({
            source,
            type,
            amount,
            date: Date.now()
        });

        // Find the card by source
        const card = await Card.findOne({ name: source });
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        const savedPayment = await newPayment.save();

        // Update card's payments and currentLimit
        card.payments.push(newPayment._id as mongoose.Types.ObjectId);

        if(type === "Debit") card.currentLimit -= amount;
        else card.currentLimit += amount;

        await card.save();

        res.status(201).json(savedPayment);
    } catch (error) {
        res.status(400).json({ message: 'Error creating payment', error });
    }
};

// Get all payments
export const getAllPayments = async (req: Request, res: Response) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments', error });
    }
};

// Get a single payment by ID
export const getPaymentById = async (req: Request, res: Response) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payment', error });
    }
};

// Update a payment
export const updatePayment = async (req: Request, res: Response) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(updatedPayment);
    } catch (error) {
        res.status(400).json({ message: 'Error updating payment', error });
    }
};

// Delete a payment
export const deletePayment = async (req: Request, res: Response) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting payment', error });
    }
};

// Get payments by source
export const getPaymentsBySource = async (req: Request, res: Response) => {
    try {
        const { source } = req.params;
        const payments = await Payment.find({ source });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments', error });
    }
};

// Get payments by status
export const getPaymentsByStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.params;
        const payments = await Payment.find({ status });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments', error });
    }
};