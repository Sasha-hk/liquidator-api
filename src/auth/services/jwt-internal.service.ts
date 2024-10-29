import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { ENV } from '../../config';

export interface JWTData {
  id: string;
}

@Injectable()
export class JwtInternalService {
  private readonly jwtAccessTokenSecret: string;
  private readonly jwtAccessTokenExpiresIn: string;

  constructor() {
    this.jwtAccessTokenSecret = ENV.JWT_ACCESS_TOKEN_SECRET;
    this.jwtAccessTokenExpiresIn = ENV.JWT_ACCESS_TOKEN_EXPIRES_IN;
  }

  async generateAccessToken(data: JWTData) {
    return jwt.sign(data, this.jwtAccessTokenSecret, {
      expiresIn: this.jwtAccessTokenExpiresIn,
    });
  }

  async validateAccessToken(accessToken: string) {
    try {
      return jwt.verify(accessToken, this.jwtAccessTokenSecret) as JWTData;
    } catch {
      return;
    }
  }
}
