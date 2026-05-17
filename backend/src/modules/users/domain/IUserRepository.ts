import { Prisma } from '@prisma/client/extension';

import { IUserProps, User } from './User.js';

export type PrismaTxClient = Prisma.TransactionClient;
export interface IUserRepository {
  save(user: User, transactionClient?: PrismaTxClient): Promise<void>;
  findAll(params: { skip: number; take: number; isActive?: boolean }): Promise<User[]>;
  findById(id: string, transactionClient?: PrismaTxClient): Promise<User | null>;
  findByEmail(email: string, transactionClient?: PrismaTxClient): Promise<User | null>;
  update(id: string, updateData: Partial<IUserProps>): Promise<void>;
  count(isActive?: boolean): Promise<number>;
}
