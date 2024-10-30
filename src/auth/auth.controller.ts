import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { LogInDto, LogInResponseDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @ApiOkResponse({
    type: LogInResponseDto,
  })
  @HttpCode(200)
  @Post('log-in')
  async logIn(@Body() body: LogInDto) {
    return this.authService.logIn(body);
  }
}
