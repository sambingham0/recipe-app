import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';

// 404 handler for unknown routes
export function notFound(req: Request, res: Response, next: NextFunction) {
  next(new AppError(404, `Route ${req.method} ${req.originalUrl} not found`, 'NOT_FOUND'));
}

// Centralized error handler
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const isAppError = err instanceof AppError;
  const status = isAppError ? err.status : 500;
  const message = isAppError ? err.message : 'Internal Server Error';
  const code = isAppError ? err.code : 'INTERNAL_ERROR';
  const details = isAppError ? err.details : undefined;

  // eslint-disable-next-line no-console
  console.error('[Error]', {
    method: req.method,
    url: req.originalUrl,
    status,
    message: (err as any)?.message ?? String(err),
    stack: (err as any)?.stack,
  });

  res.status(status).json({
    error: {
      message,
      code,
      details
    },
  });
}
