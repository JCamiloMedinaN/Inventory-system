import { Router } from 'express';

import { validateDto } from '../../../../shared/middleware/validateDto.js';

import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
} from '../../../../compositionRoot.js';
import { validateUserIdParam } from '../../../../shared/middleware/validateIdParam.js';

import { createUserDto } from '../dtos/create-user.dto.js';

export const usersRouter = Router();

usersRouter.get('/:id', validateUserIdParam, (req, res, next) =>
  getUserByIdController.run(req, res, next),
);

usersRouter.post('/', validateDto(createUserDto), (req, res, next) =>
  createUserController.run(req, res, next),
);

usersRouter.get('/', (req, res, next) => getAllUsersController.run(req, res, next));
