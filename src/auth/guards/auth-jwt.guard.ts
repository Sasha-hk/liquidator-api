import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { JwtInternalService } from '../services/jwt-internal.service';

export function extractTokenFromHeader(request?: Request): string | undefined {
  const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtInternalService: JwtInternalService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const validatedToken =
      await this.jwtInternalService.validateAccessToken(token);
    if (!validatedToken) {
      throw new UnauthorizedException();
    }

    request.user = validatedToken;

    return true;
  }
}
