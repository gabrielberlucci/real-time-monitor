import { authMiddleware } from '@/middleware/auth/auth.middleware';
import { url } from '@/controllers/url.controller';
import { Router } from 'express';

const urlRouter: Router = Router();

urlRouter.post('/create', authMiddleware, url);

export { urlRouter };
