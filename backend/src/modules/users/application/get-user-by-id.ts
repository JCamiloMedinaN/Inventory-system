import { NotFoundError } from '../../../shared/errors/HttpError.js';

import { IUserRepository } from '../domain/IUserRepository.js';
import { User } from '../domain/User.js';

export class GetUserById {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}
