import { Router } from 'express';

import { usersRouter } from './modules/users/infrastructure/routes/users.routes.js';

export const apiRouter = Router();

apiRouter.use('/users', usersRouter);
