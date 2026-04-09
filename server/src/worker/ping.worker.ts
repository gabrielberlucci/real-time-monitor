import { Worker } from 'bullmq';
import axios, { AxiosError } from 'axios';
import { workerPrisma } from './lib/prisma';

const pingWorker = new Worker(
  'verify-uptime',
  async (job) => {
    const { urlId, urlLink } = job.data;

    //TODO: move this to a logger
    // console.log(
    //   `[Worker] Iniciando o teste da URL: ${urlLink} At: ${Date()} urlId: ${urlId}`,
    // );

    const start = performance.now();

    try {
      const result = await axios.get(urlLink, {
        timeout: 5000,
        validateStatus: () => true,
      });
      const duration = Math.round(performance.now() - start);

      const requestStatus = result.status;
      const statusText = result.statusText;

      await workerPrisma.logs.create({
        data: {
          urlStatus: requestStatus,
          latency: duration,
          urlText: statusText,
          urlId: urlId,
        },
      });
    } catch (error) {
      //TODO: this is stupid af, but it works for now (please, refactor this!!!)
      let finalError: string = '';
      if (error instanceof AxiosError) {
        finalError = error.code!;
      }

      const duration = Math.round(performance.now() - start);

      await workerPrisma.logs.create({
        data: {
          urlStatus: 0,
          latency: duration,
          urlText: finalError,
          urlId: urlId,
        },
      });
    }
  },
  {
    connection: {
      host: process.env.REDIS_URL,
      port: process.env.REDIS_PORT,
    },
    limiter: {
      duration: 5000,
      max: 50,
    },
  },
);

//TODO: move this to a logger
pingWorker.on('failed', (job, err) => {
  console.error(
    `[Worker] O job da URL ${job?.data.urlId} falhou:`,
    err.message,
  );
});
