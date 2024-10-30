import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

import { ENV } from '../config';

@Injectable()
export class RedisService implements OnModuleDestroy {
  public readonly redis: Redis;

  constructor() {
    this.redis = new Redis(ENV.REDIS_URL);
  }

  async onModuleDestroy() {
    this.redis.quit();
  }
}
