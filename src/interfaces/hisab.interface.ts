import { Document } from 'mongoose';

// Card Schema
export interface IHisab extends Document {
  title: string;
  details: string;
  totalAmount: number;
  isActive: boolean;
  paymentReceived: boolean;
}