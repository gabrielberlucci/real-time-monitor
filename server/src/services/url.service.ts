import { FreePlanError } from '@/error/FreePlanError';
import { prisma } from '@/lib/prisma';
import { UrlQueueService } from '@/queue/url.queue.service';

export const createUrl = async (url: string, userId: string) => {
  const totalUserUrl = await prisma.url.count({
    where: { userId: userId },
  });

  if (totalUserUrl >= 5) {
    throw new FreePlanError('Free plan limit reached');
  }

  const newUrl = await prisma.url.create({
    data: {
      urlLink: url,
      userId: userId,
    },

    select: {
      id: true,
      urlLink: true,
    },
  });

  const schedulerId = `url-monitor-${newUrl.id}`;

  await UrlQueueService(schedulerId, newUrl.id, newUrl.urlLink);

  return newUrl;
};
