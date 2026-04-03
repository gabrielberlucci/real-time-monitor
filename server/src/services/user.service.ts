import { prisma } from '@/lib/prisma';
import type { User } from 'generated/prisma/client';
import bcrypt from 'bcrypt';

export const createUser = async (userData: User) => {
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
};
