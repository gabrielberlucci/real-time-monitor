import { FreePlanError } from '@/error/FreePlanError';
import { prisma } from '@/lib/prisma';

export const createUrl = async (url: string, userId: string) => {
  try {
    const totalUserUrl = await prisma.url.count({
      where: { userId: userId },
    });

    if (totalUserUrl >= 5) {
      throw new FreePlanError('Free plan limit reached');
    }

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
