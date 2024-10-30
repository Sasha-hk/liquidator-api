import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { GetUserFromRequest } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { JWTData } from '../auth/services/jwt-internal.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@GetUserFromRequest() user: JWTData) {
    return this.userService.getUser(user);
  }
}
