import mongoose, { Schema } from "mongoose";
import { ICard } from "../interfaces/card.interface";

const CardSchema: Schema = new Schema({
    name: { type: Array, required: true },
    type: { type: String, required: true },
    totalLimit: { type: Number, required: true },
    currentLimit: { type: Number, required: true },
    payments: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
    billDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
});

const Card = mongoose.model<ICard>('Card', CardSchema);

export default Card;