import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodTypeAny } from 'zod';
import AppError from '../utils/AppError';

type Schemas = {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
};

export function validate(schemas: Schemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.params) {
        const parsed = schemas.params.safeParse(req.params);
        if (!parsed.success) throw parsed.error;
        // assign back if needed
        req.params = parsed.data as any;
      }
      if (schemas.query) {
        const parsed = schemas.query.safeParse(req.query);
        if (!parsed.success) throw parsed.error;
        req.query = parsed.data as any;
      }
      if (schemas.body) {
        const parsed = schemas.body.safeParse(req.body);
        if (!parsed.success) throw parsed.error;
        req.body = parsed.data;
      }
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const details = err.flatten();
        return next(new AppError(400, 'Validation error', 'VALIDATION_ERROR', details));
      }
      return next(err);
    }
  };
}
