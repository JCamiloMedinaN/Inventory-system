import bcrypt from 'bcrypt';

import { prisma } from '../../../shared/infrastructure/prisma/prisma.instance.js';
import { buildWelcomeUserEmail } from '../../../shared/emailTemplates/welcome-user-template.js';
import { ConflictError } from '../../../shared/errors/HttpError.js';

import { User, UserRole } from '../domain/User.js';
import { IUserRepository } from '../domain/IUserRepository.js';
import { IEmailService } from '../domain/services/IEmailService.js';

export class CreateUserByAdmin {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly getEmailService: () => IEmailService,
  ) {}

  async execute(email: string, username: string, role: UserRole): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new ConflictError('User already exists');

    const tempPassword = Math.random().toString(36).slice(-10);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    await prisma.$transaction(async (transactionClient) => {
      const existingUser = await this.userRepository.findByEmail(email, transactionClient);
      if (existingUser) throw new ConflictError('User already exists');

      const user = User.create({
        email,
        username,
        role,
        password: hashedPassword,
        isTemporaryPass: true,
      });

      await this.userRepository.save(user, transactionClient);
    });

    const { subject, body } = buildWelcomeUserEmail(tempPassword);
    await this.getEmailService().sendEmail(email, subject, body);
  }
}
