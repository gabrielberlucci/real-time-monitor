import { Worker } from 'bullmq';
import axios from 'axios';

const pingWorker = new Worker(
  'verify-uptime',
  async (job) => {
    const { urlId, urlLink } = job.data;

    console.log(
      `[Worker] Iniciando o teste da URL: ${urlLink} At: ${Date()} urlId: ${urlId}`,
    );

    const start = performance.now();

    try {
      const result = await axios.get(urlLink, {
        timeout: 5000,
        validateStatus: () => true,
      });
      const duration = Math.round(performance.now() - start);

      const requestStatus = result.status;
      const statusText = result.statusText;

      console.log(duration);
      console.log(requestStatus);
      console.log(statusText);
    } catch (error) {
      console.log(error);
    }
  },
  {
    connection: {
      host: process.env.REDIS_URL,
      port: process.env.REDIS_PORT,
    },
  },
);
