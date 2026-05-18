import { Request, Response, NextFunction } from 'express';

interface IAuthenticatedRequest extends Request {
  user: { role: string };
}

export const checkRole = (roles: string[]) => {
  return (req: IAuthenticatedRequest, res: Response, next: NextFunction): void => {
    const user = req.user;
    if (!roles.includes(user.role)) {
      res.status(403).json({ message: 'No tienes permisos para esta acción' });
      return;
    }
    next();
  };
};
