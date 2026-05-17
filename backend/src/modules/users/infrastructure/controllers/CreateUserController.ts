import { NextFunction, Request, Response } from 'express';

import { CreateUserByAdmin } from '../../application/create-user-by-admin.js';

export class CreateUserController {
  constructor(private readonly createUserByAdmin: CreateUserByAdmin) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, username, role } = req.body;

    try {
      await this.createUserByAdmin.execute(email, username, role);
      res.status(201).json({ message: 'User created successfully and notification sent' });
    } catch (error) {
      next(error);
    }
  }
}
