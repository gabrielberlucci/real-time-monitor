import { prisma } from '@/lib/prisma';
import type { User } from 'generated/prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '@/error/UnauthorizedError';
import { ConflictError } from '@/error/ConflictError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

export const createUser = async (userData: User) => {
  try {
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: encryptedPassword,
      },

      select: {
        email: true,
        name: true,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code == 'P2002') {
        throw new ConflictError('Email already taken');
      }
    }

    throw error;
  }
};

export const logUser = async (userData: User) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (!result) {
      throw new UnauthorizedError('Invalid e-mail or password');
    }

    const match = await bcrypt.compare(userData.password, result.password);

    if (!match) {
      throw new UnauthorizedError('Invalid e-mail or password');
    }

    const payload = {
      id: result.id,
      email: result.email,
      name: result.name,
    };
    if (match) {
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });

      return token;
    }
  } catch (error) {
    throw error;
  }
};
