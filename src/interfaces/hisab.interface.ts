import { Document } from 'mongoose';

// Card Schema
export interface IHisab extends Document {
  title: string;
  details: string;
  isActive: boolean;
  paymentReceived: boolean;
}