import mongoose, { Schema } from "mongoose";
import { IOrder } from "../interfaces/order.interface";

const OrderSchema: Schema = new Schema({
    deviceName: { type: String, required: true },
    platform: { type: String, required: true },
    orderId: { type: String, required: true, unique: true },
    card: { type: Schema.Types.ObjectId, ref: 'Card', required: true },
    quantity: { type: Number, required: true },
    pincode: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    returnAmount: { type: Number, default: 0 },
    doneBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderDate: { type: Date, default: Date.now },
    cashBack: { type: Number, default: 0 },
    commission: { type: Number, required: true },
    delivery: { type: String, enum: ['Pending', 'Delivered', 'Cancelled'], default: 'Pending' },
    deliveryDate: { type: Date },
    paymentReceived: { type: Boolean, default: false },
    profit: { type: Number, required: true },
    transfer: { type: Boolean }
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema);