import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  NODE_ENV: z
    .string()
    .nonempty('NODE_ENV is required')
    .refine((value) => ['development', 'test', 'production'].includes(value), {
      message: 'NODE_ENV must be one of: development, test, production',
    }),
  PORT: z.string().nonempty('PORT is required').transform(Number),
  DATABASE_URL: z.url('DATABASE_URL must be a valid URL'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid Environment Variables:');
  for (const issue of _env.error.issues) {
    console.error(`- [${issue.path.join('.')}] ${issue.message}`);
  }
  process.exit(1);
}

export const env = _env.data;
