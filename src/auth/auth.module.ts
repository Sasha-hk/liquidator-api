import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/auth-jwt.guard';
import { AuthService } from './services/auth.service';
import { JwtInternalService } from './services/jwt-internal.service';

@Module({
  providers: [AuthService, JwtInternalService, JwtAuthGuard],
  controllers: [AuthController],
  imports: [UserModule],
  exports: [JwtAuthGuard, JwtInternalService],
})
export class AuthModule {}
