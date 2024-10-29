import { defineConfig } from 'drizzle-kit';

import { ENV } from './src/config';

export default defineConfig({
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  out: './src/db/migrations',
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
