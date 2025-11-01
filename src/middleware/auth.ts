import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';

export function ensureAuth(req: Request, _res: Response, next: NextFunction) {
  // Passport exposes isAuthenticated
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return next(new AppError(401, 'Authentication required', 'AUTH_REQUIRED'));
}

export default ensureAuth;
