import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

import { UsersTable } from '../db/schema';

@Injectable()
export class UserCacheService {
  readonly key = 'user-id';

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getUserById(id: string) {
    const user = await this.redis.get(this.key + id);

    if (user) {
      return JSON.parse(user);
    }
  }

  async setUserWithId(id: string, user: typeof UsersTable.$inferSelect) {
    await this.redis.set(this.key + id, JSON.stringify(user), 'EX', 60);
  }
}
