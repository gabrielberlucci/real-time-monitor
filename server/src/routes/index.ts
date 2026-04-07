import { Router } from 'express';
import { userRouter } from './user.routes';
import { urlRouter } from './url.router';

const routes: Router = Router();

routes.use('/api/user', userRouter);
routes.use('/api/url', urlRouter);

export { routes };
