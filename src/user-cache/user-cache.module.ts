import { Module } from '@nestjs/common';

import { RedisModule } from '../redis/redis.module';
import { UserCacheService } from './user-cache.service';

@Module({
  providers: [UserCacheService],
  exports: [UserCacheService],
  imports: [RedisModule],
})
export class UserCacheModule {}
