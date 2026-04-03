import { registerUser } from '@/controllers/user.controller';
import { Router } from 'express';

const userRouter: Router = Router();

userRouter.post('/register', registerUser);

export { userRouter };
