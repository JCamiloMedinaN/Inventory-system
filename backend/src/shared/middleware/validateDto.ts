import { ZodType } from 'zod';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export function validateDto(schema: ZodType): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);
    if (!validationResult.success) {
      const errorMessages = validationResult.error.issues.map((issue) => issue.message).join(', ');
      return res.status(400).json({
        error: errorMessages,
      });
    }
    req.body = validationResult.data;
    next();
  };
}
