import { registerUser } from '@/controllers/user.controller';
import { validateData } from '@/middleware/validation/validation.middleware';
import { userRegisterSchema } from '@/schemas/user.schema';
import { Router } from 'express';

const userRouter: Router = Router();

userRouter.post('/register', validateData(userRegisterSchema), registerUser);

export { userRouter };
