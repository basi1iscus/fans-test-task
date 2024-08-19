import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async verify(context: ExecutionContext): Promise<unknown> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new Error('Auth service verify error');
    }
    try {
      return this.jwtService.verifyAsync(token);
    } catch (e) {
      throw new Error('Auth service verify error');
    }
  }

  async getToken(userId: number): Promise<unknown> {
    try {
      const payload = { userId: userId };
      return {
        token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      throw new Error('Auth service verify error');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // use object destruction instead of array destruction for performance reasons
    const { '0': type, '1': token } =
      request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
