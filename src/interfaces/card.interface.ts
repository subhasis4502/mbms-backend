import mongoose, { Document } from 'mongoose';

// Card Schema
export interface ICard extends Document {
    name: string[];
    type: string;
    totalLimit: number;
    currentLimit: number;
    payments: mongoose.Types.ObjectId[];
    billDate: Date;
    isActive: boolean;
}