import mongoose, { Document } from 'mongoose';

// Order Schema
export interface IOrder extends Document {
    deviceName: string;
    platform: string;
    orderId: string;
    card: mongoose.Types.ObjectId;
    cardName: string;
    quantity: number;
    pincode: string;
    amountPaid: number;
    returnAmount: number;
    doneBy: mongoose.Types.ObjectId;
    doneByUser: string;
    orderDate: Date;
    cashBack: number;
    commission: number;
    delivery: string;
    deliveryDate?: Date;
    paymentReceived: boolean;
    profit: number;
    transfer?: boolean;
  }