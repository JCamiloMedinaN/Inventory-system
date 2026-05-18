import { Request, Response, NextFunction } from 'express';

import { BadRequestError } from '../errors/HttpError.js';

export function validateUserIdParam(req: Request, _res: Response, next: NextFunction): void {
  const { id } = req.params;
  if (typeof id !== 'string') {
    return next(new BadRequestError('Incorrect data type for id parameter'));
  }
  next();
}
