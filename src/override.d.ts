// src/types/env.d.ts (or override.d.ts)
declare namespace NodeJS {
  /**
   * Contains all environment variables used in the application
   */
  interface ProcessEnv {
    NODE_ENV: string;
    BASE_URL: string;
    BLOB_READ_WRITE_TOKEN: string;
  }
}
