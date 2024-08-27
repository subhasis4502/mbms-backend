import { Response, NextFunction } from 'express';
import { IAuthRequest } from '../interfaces/express.interface';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';

export const authenticate = (req: IAuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

export const authorize = (role: string) => {
  return (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
  };
};