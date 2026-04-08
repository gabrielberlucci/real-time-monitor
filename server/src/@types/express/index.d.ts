declare namespace Express {
  export interface Request {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
}

namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    PORT: number;
    NODE_ENV: string;
    BASE_URL: string;
    JWT_SECRET: string;
    REDIS_URL: string;
    REDIS_PORT: number;
  }
}
