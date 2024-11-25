import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// const revokedTokens = new Set<string>();

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user): Promise<string> {
    const payload = { user };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  // async revokeToken(token: string): Promise<void> {
  //   const decodedToken = this.jwtService.decode(token);
  //   if (!decodedToken) {
  //     throw new Error('Invalid token');
  //   }

  //   revokedTokens.add(token);
  // }

  // async isTokenRevoked(token: string): Promise<boolean> {
  //   return revokedTokens.has(token);
  // }

  async verifyToken(token: string): Promise<any> {
    try {
      // if (await this.isTokenRevoked(token)) {
      //   throw new Error('Token has been revoked');
      // }

      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      return decoded;
    } catch (error) {
      throw new Error('Token is invalid or expired');
    }
  }
}
