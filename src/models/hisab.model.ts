import mongoose, { Schema } from "mongoose";
import { IHisab } from "../interfaces/hisab.interface";

const HisabSchema: Schema = new Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  paymentReceived: { type: Boolean, default: false },
});

const Hisab = mongoose.model<IHisab>('Hisab', HisabSchema);

export default Hisab;