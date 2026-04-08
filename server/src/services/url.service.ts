import { prisma } from '@/lib/prisma';
import type { Url } from 'generated/prisma/client';

export const createUrl = async (url: string, userId: string) => {
  try {
    const urlData = prisma.url.create({
      data: {
        urlLink: url,
        userId: userId,
      },

      select: {
        urlLink: true,
      },
    });

    return urlData;
  } catch (error) {
    throw error;
  }
};
