import { email, z } from 'zod';

export const userRegisterSchema = z.object({
  email: z.email(),
  name: z.string(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});
