import { Request, Response, NextFunction } from 'express';

import { GetAllUsers } from '../../application/get-all-users.js';

export class GetAllUsersController {
  constructor(private readonly getAllUsers: GetAllUsers) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paginatedResult = await this.getAllUsers.execute(req.query);
      const data = paginatedResult.data.map((user) => user.properties);

      res.status(200).json({
        ...paginatedResult,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
