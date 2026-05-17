import { z } from 'zod';

import { UserRole } from '../../domain/User.js';

export const createUserDto = z.object({
  email: z.email({ message: 'Must be a valid email' }),
  username: z
    .string({ message: 'Username must be a string' })
    .min(3, { message: 'Username must be at least 3 characters' }),
  role: z.enum(UserRole, {
    message: 'Invalid role',
  }),
});
