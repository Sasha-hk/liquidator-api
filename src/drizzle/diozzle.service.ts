import { Injectable } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

import { ENV } from '../config';
import * as schema from '../db/schema';

@Injectable()
export class DrizzleService {
  public db: NodePgDatabase<typeof schema>;

  constructor() {
    this.db = drizzle(ENV.DATABASE_URL, {
      schema: schema,
    });
  }
}
