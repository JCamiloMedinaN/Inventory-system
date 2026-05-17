import { Request, Response, NextFunction } from 'express';

import { GetUserById } from '../../application/get-user-by-id.js';

export class GetUserByIdController {
  constructor(private readonly getUserById: GetUserById) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.getUserById.execute(id as string);
      const result = user.properties;
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
