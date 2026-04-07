import { z } from 'zod';

export const urlCreateSchema = z.object({
  urlLink: z.url(),
});
