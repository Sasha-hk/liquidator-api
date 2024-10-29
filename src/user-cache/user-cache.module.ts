import { Module } from '@nestjs/common';

import { UserCacheService } from './user-cache.service';

@Module({
  providers: [UserCacheService],
  exports: [UserCacheService],
})
export class UserCacheModule {}
