import z from 'zod';

export const PaginationDto = z.object({
  page: z.coerce
    .number()
    .int({ message: 'Value must be an integer' })
    .positive({ message: 'Value must be positive' })
    .default(1),

  rowsPerPage: z.coerce
    .number()
    .int({ message: 'Value must be an integer' })
    .positive({ message: 'Value must be positive' })
    .max(100, { message: 'Value too high' })
    .default(10),
});
