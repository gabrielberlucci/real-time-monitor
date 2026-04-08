import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { User } from 'generated/prisma/client';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cookies = req.cookies;

  if (!cookies.access_token) {
    return res.status(401).send({
      message: 'Access Denied. No token provided',
    });
  }
  try {
    const token = cookies.access_token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as User;

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({
        error: error.message,
      });
    }

    res.status(500).send({
      error: 'Server internal error',
    });
  }
};
