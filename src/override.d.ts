declare global {
  export namespace NodeJS {
    /**
     * Contains all environment variables used in the application
     */
    interface ProcessEnv {
      NODE_ENV: string;
      NEXT_PUBLIC_RICH_TEXT_EDITOR: string;
      NEXT_PUBLIC_APP_URL: string;
      // Database
      DATABASE_URL: string;
      AUTH_SECRET: string;
      SMTP_USER: string;
      SMTP_PASS: string;
      SMTP_HOST: string;
      SMTP_DOMAIN: string;
      SMTP_PORT: string;
      SMTP_SERVER: string;
      SMTP_SECURE: string;
      SOUK_TOKEN: string;
      UPLOADTHING_TOKEN: string;
      JWT_SECRET: string;
      SPLAINER_TOKEN: string;
    }
  }
}
