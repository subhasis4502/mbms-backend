import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', UserSchema);