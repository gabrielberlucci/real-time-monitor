import { Queue } from 'bullmq';

const pingQueue = new Queue('verify-uptime', {
  connection: {
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT || 6490,
  },
});

export const UrlQueueService = async (
  schedulerId: string,
  urlId: number,
  urlLink: string,
) => {
  await pingQueue.upsertJobScheduler(
    schedulerId,
    {
      every: 300000,
      limit: 100,
    },
    {
      name: 'verify-uptime',
      data: {
        urlId: urlId,
        urlLink: urlLink,
      },
    },
  );
};
