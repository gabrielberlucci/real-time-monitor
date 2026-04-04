import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  email: string;
  name: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cookies = req.cookies;

  console.log(cookies);

  if (!cookies.access_token) {
    return res.status(401).send({
      message: 'Access Denied. No token provided',
    });
  }
  try {
    const token = cookies.access_token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    //TODO: make a decent type for this!!!
    (req as any).user = decoded;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({
        error: error.message,
      });
    }

    console.log(error);
    res.status(500).send({
      error: 'Server internal error',
    });
  }
};
