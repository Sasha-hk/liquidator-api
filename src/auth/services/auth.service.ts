import { BadRequestException, Injectable } from '@nestjs/common';
import { compareSync, hash } from 'bcryptjs';

import { ENV } from '../../config';
import { UserService } from '../../user/user.service';
import { LogInDto, RegisterDto } from '../dto/auth.dto';
import { JwtInternalService } from './jwt-internal.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtInternalService: JwtInternalService,
  ) {}

  async logIn(data: LogInDto) {
    const user = await this.userService.getUserByEmail(data.email);

    if (!user) {
      throw new BadRequestException('User not exists');
    }

    if (!compareSync(data.password, user.password)) {
      throw new BadRequestException('Bad password');
    }

    return {
      accessToken: await this.jwtInternalService.generateAccessToken({
        id: user.id,
      }),
    };
  }

  async register(data: RegisterDto) {
    await this.userService.checkIfUserAlreadyExists(data);

    const hashedPassword = await hash(data.password, ENV.PASSWORD_HASH);

    const newUser = await this.userService.createNewUser({
      email: data.email.toLowerCase(),
      username: data.username.toLowerCase(),
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    delete newUser.password;
    return newUser;
  }
}
