import { D1Database } from '@cloudflare/workers-types';

export interface DbContext {
  db: D1Database;
}

export function getDbContext(env: any): DbContext {
  return {
    db: env.DB
  };
}
