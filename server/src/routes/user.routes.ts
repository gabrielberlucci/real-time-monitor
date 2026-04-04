import { registerUser, loginUser } from '@/controllers/user.controller';
import { authMiddleware } from '@/middleware/auth/auth.middleware';
import { validateData } from '@/middleware/validation/validation.middleware';
import { userLoginSchema, userRegisterSchema } from '@/schemas/user.schema';
import { Router } from 'express';

const userRouter: Router = Router();

userRouter.post('/register', validateData(userRegisterSchema), registerUser);
userRouter.post('/login', validateData(userLoginSchema), loginUser);

export { userRouter };
