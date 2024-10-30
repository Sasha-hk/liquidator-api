import { Injectable } from '@nestjs/common';

import { UsersTable } from '../db/schema';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UserCacheService {
  readonly key = 'user-id';

  constructor(private readonly redisService: RedisService) {}

  async getUserById(id: string) {
    const user = await this.redisService.redis.get(this.key + id);

    if (user) {
      return JSON.parse(user);
    }
  }

  async setUserWithId(id: string, user: typeof UsersTable.$inferSelect) {
    await this.redisService.redis.set(
      this.key + id,
      JSON.stringify(user),
      'EX',
      60,
    );
  }
}
