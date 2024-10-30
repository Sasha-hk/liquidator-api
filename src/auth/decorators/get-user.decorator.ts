import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { JWTData } from '../services/jwt-internal.service';

export const GetUserFromRequest = createParamDecorator(
  (_: unknown, context: ExecutionContext): JWTData => {
    const request = context?.switchToHttp()?.getRequest();

    if (!request) {
      throw new UnauthorizedException();
    }

    return (request as any).user;
  },
);
