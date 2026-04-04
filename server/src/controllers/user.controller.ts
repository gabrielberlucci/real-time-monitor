import { ConflictError } from '@/error/ConflictError';
import { UnauthorizedError } from '@/error/UnauthorizedError';
import { createUser, logUser } from '@/services/user.service';
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
    if (error instanceof ConflictError) {
      return res.status(error.statusCode).send({
        errorName: error.name,
        error: error.message,
      });
    }
    res.status(500).send({
      error: 'Internal Server Error',
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await logUser(userData);

    res.status(200).cookie('access_token', user, { httpOnly: true }).send({
      message: 'User logged in successfully',
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(error.statusCode).send({
        errorName: error.name,
        error: error.message,
      });
    }

    res.status(500).send({
      error: 'Internal Server Error',
    });
  }
};
