import { createUser } from '@/services/user.service';
import type { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const user = await createUser(userData);

    res.status(200).send({
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      error: 'Internal Server Error',
    });
  }
};
