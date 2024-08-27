import { Request } from 'express';
import { IUser } from './user.interface';

export interface IAuthRequest extends Request {
  user?: IUser;
}