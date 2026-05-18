import { prisma, PrismaClient } from '../../../../shared/infrastructure/prisma/prisma.instance.js';

import { User, UserRole as DomainUserRole, IUserProps } from '../../domain/User.js';
import { IUserRepository } from '../../domain/IUserRepository.js';

export class PrismaUserRepository implements IUserRepository {
  async save(user: User, transactionClient?: PrismaClient): Promise<void> {
    const client = transactionClient ?? prisma;
    const data = user.properties;
    await client.user.upsert({
      where: { id: data.id || '' },
      update: {
        email: data.email,
        password: data.password,
        username: data.username,
        role: data.role,
        isTemporaryPass: data.isTemporaryPass,
        updatedBy: data.updatedBy,
      },
      create: {
        email: data.email,
        password: data.password!,
        username: data.username,
        role: data.role,
        isTemporaryPass: data.isTemporaryPass,
        createdBy: data.createdBy,
      },
    });
  }

  async count(isActive?: boolean): Promise<number> {
    return prisma.user.count({
      where: isActive !== undefined ? { isActive } : undefined,
    });
  }
  async findAll(params: { skip: number; take: number; isActive?: boolean }): Promise<User[]> {
    const usersData = await prisma.user.findMany({
      skip: params.skip,
      take: params.take,
      orderBy: { createdAt: 'desc' },
      where: params.isActive !== undefined ? { isActive: params.isActive } : undefined,
    });
    return usersData.map((userData) =>
      User.create({
        id: userData.id,
        email: userData.email,
        username: userData.username,
        role: userData.role as DomainUserRole,
        isTemporaryPass: userData.isTemporaryPass,
        isActive: userData.isActive,
        createdBy: userData.createdBy ?? undefined,
        updatedBy: userData.updatedBy ?? undefined,
      }),
    );
  }

  async findById(id: string, transactionClient?: PrismaClient): Promise<User | null> {
    const client = transactionClient ?? prisma;
    const userData = await client.user.findUnique({
      where: { id },
    });
    if (!userData) return null;
    return User.create({
      id: userData.id,
      email: userData.email,
      username: userData.username,
      role: userData.role as unknown as DomainUserRole,
      isTemporaryPass: userData.isTemporaryPass,
      isActive: userData.isActive,
      createdBy: userData.createdBy ?? undefined,
      updatedBy: userData.updatedBy ?? undefined,
    });
  }

  async findByEmail(email: string, transactionClient?: PrismaClient): Promise<User | null> {
    const client = transactionClient ?? prisma;
    const userData = await client.user.findUnique({
      where: { email },
    });
    if (!userData) return null;
    return User.create({
      id: userData.id,
      email: userData.email,
      username: userData.username,
      role: userData.role as unknown as DomainUserRole,
      isTemporaryPass: userData.isTemporaryPass,
      isActive: userData.isActive,
      createdBy: userData.createdBy ?? undefined,
      updatedBy: userData.updatedBy ?? undefined,
    });
  }

  async update(id: string, updateData: Partial<IUserProps>): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: {
        email: updateData.email,
        username: updateData.username,
        password: updateData.password,
        role: updateData.role,
        isTemporaryPass: updateData.isTemporaryPass,
        isActive: updateData.isActive,
        updatedBy: updateData.updatedBy,
      },
    });
  }
}
