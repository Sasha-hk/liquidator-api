import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { UserCacheModule } from '../user-cache/user-cache.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [DrizzleModule, forwardRef(() => AuthModule), UserCacheModule],
  exports: [UserService],
})
export class UserModule {}
