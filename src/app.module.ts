import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, DrizzleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
