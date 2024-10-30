import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import { UserCacheModule } from './user-cache/user-cache.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DrizzleModule,
    UserCacheModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
