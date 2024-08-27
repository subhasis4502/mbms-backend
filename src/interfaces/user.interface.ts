import { Document } from 'mongoose';

// User Schema
export interface IUser extends Document {
    username: string;
    name: string;
    role: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
}