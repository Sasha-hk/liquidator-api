import { BadRequestException, Injectable } from '@nestjs/common';

import { RegisterDto } from '../auth/dto/auth.dto';
import { JWTData } from '../auth/services/jwt-internal.service';
import { UsersTable } from '../db/schema';
import { DrizzleService } from '../drizzle/diozzle.service';

@Injectable()
export class UserService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getUserByEmail(email: string) {
    return this.drizzleService.db.query.UsersTable.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
  }

  async getUserById(id: string) {
    return this.drizzleService.db.query.UsersTable.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
  }

  async createNewUser(data: RegisterDto) {
    return (
      await this.drizzleService.db.insert(UsersTable).values(data).returning()
    )[0];
  }

  async checkIfUserAlreadyExists({
    username,
    email,
  }: Pick<RegisterDto, 'username' | 'email'>) {
    const user = await this.drizzleService.db.query.UsersTable.findFirst({
      where: (user, { eq, or }) =>
        or(eq(user.email, email), eq(user.username, username)),
    });

    if (user) {
      if (user.email === email) {
        throw new BadRequestException('User with this email already exists');
      } else {
        throw new BadRequestException('User with this username already exists');
      }
    }
  }

  async getUser(data: JWTData) {
    const user = await this.getUserById(data.id);
    if (!user) {
      throw new BadRequestException();
    }

    delete user.password;

    return user;
  }
}
