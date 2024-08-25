import { Document } from 'mongoose';

// Payment Schema
export interface IPayment extends Document {
    source: string;
    type: string;
    amount: number;
    date: Date;
    status: string;
}