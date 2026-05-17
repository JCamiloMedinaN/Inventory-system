import { IPaginationParams, parsePaginationParams } from '../../../shared/util/pagination.js';

import { IUserRepository } from '../domain/IUserRepository.js';
import { User } from '../domain/User.js';

export interface IGetAllUsersParams extends Partial<IPaginationParams> {
  isActive?: boolean | string;
}

export interface IPaginatedUsers {
  metadata: {
    total: number;
    page: number;
    rowsPerPage: number;
    totalPages: number;
  };
  data: User[];
}

function parseIsActive(isActive: unknown): boolean | undefined {
  if (typeof isActive === 'boolean') return isActive;
  if (isActive === 'true') return true;
  if (isActive === 'false') return false;
  return undefined;
}

export class GetAllUsers {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: IGetAllUsersParams): Promise<IPaginatedUsers> {
    const { page, rowsPerPage } = parsePaginationParams(params);
    const isActive = parseIsActive(params.isActive);

    const skip = (page - 1) * rowsPerPage;
    const take = rowsPerPage;

    const [users, total] = await Promise.all([
      this.userRepository.findAll({ skip, take, isActive }),
      this.userRepository.count(isActive),
    ]);

    const totalPages = Math.ceil(total / rowsPerPage);

    return {
      metadata: {
        total,
        page,
        rowsPerPage,
        totalPages,
      },
      data: users,
    };
  }
}
