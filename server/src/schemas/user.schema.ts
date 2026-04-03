import { z } from 'zod';

export const userRegisterSchema = z.object({
  email: z.email(),
  name: z.string(),
  password: z.string().min(8),
});
