import { Router } from 'express';
import { userRouter } from './user.routes';

const routes: Router = Router();

routes.use('/api/user', userRouter);

export { routes };
