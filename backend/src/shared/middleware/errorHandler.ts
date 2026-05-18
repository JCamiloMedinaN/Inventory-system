import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import { HttpError } from '../errors/HttpError.js';

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof HttpError) {
    res.status(error.status).json({ error: error.message });
    return;
  }

  if (error instanceof ZodError) {
    const errorMessages = error.issues.map((issue) => issue.message).join(', ');
    res.status(400).json({ error: errorMessages });
    return;
  }

  console.error('Unhandled Error:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
