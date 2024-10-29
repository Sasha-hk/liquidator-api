import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';

import { AuthModule } from './auth/auth.module';
import { ENV } from './config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { UserModule } from './user/user.module';
import { UserCacheModule } from './user-cache/user-cache.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DrizzleModule,
    RedisModule.forRoot({
      type: 'single',
      url: ENV.REDIS_URL,
    }),
    UserCacheModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
