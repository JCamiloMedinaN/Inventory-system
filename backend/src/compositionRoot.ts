import { NodemailerEmailService } from './shared/infrastructure/email/NodemailerEmailService.js';

import { CreateUserByAdmin } from './modules/users/application/create-user-by-admin.js';
import { GetAllUsers } from './modules/users/application/get-all-users.js';
import { GetUserById } from './modules/users/application/get-user-by-id.js';

import { CreateUserController } from './modules/users/infrastructure/controllers/CreateUserController.js';
import { GetAllUsersController } from './modules/users/infrastructure/controllers/GetAllUsersController.js';
import { GetUserByIdController } from './modules/users/infrastructure/controllers/GetUserByIdController.js';
import { PrismaUserRepository } from './modules/users/infrastructure/repositories/PrismaUserRepository.js';

// Instancia dependencias
const userRepository = new PrismaUserRepository();
let emailService: NodemailerEmailService = new NodemailerEmailService();

export function setEmailService(service: NodemailerEmailService): void {
  emailService = service;
}
export function getEmailService(): NodemailerEmailService {
  return emailService;
}

// Cambia aquí: pasa una función que obtiene el emailService actual
const createUserByAdmin = new CreateUserByAdmin(userRepository, () => getEmailService());
export const createUserController = new CreateUserController(createUserByAdmin);

const getAllUsers = new GetAllUsers(userRepository);
export const getAllUsersController = new GetAllUsersController(getAllUsers);

const getUserById = new GetUserById(userRepository);
export const getUserByIdController = new GetUserByIdController(getUserById);
