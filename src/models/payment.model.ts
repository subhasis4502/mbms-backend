import mongoose, { Schema } from "mongoose";
import { IPayment } from "../interfaces/payment.interface";

const PaymentSchema: Schema = new Schema({
    source: { type: String, required: true },
    type: { type: String, enum: ['Credit', 'Debit'], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Completed' }
});

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;