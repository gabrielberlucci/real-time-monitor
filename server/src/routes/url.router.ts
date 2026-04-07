import { authMiddleware } from '@/middleware/auth/auth.middleware';
import { url } from '@/controllers/url.controller';
import { Router } from 'express';
import { validateData } from '@/middleware/validation/validation.middleware';
import { urlCreateSchema } from '@/schemas/url.schema';

const urlRouter: Router = Router();

urlRouter.post('/create', validateData(urlCreateSchema), authMiddleware, url);

export { urlRouter };
