import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import getRequestFromContext from '@api/utils/get-request-from-context';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (
      this.reflector.get<boolean>(
        'allowUnauthenticatedAccess',
        context.getHandler(),
      )
    ) {
      return true;
    }
    const request = getRequestFromContext(context);
    try {
      const token = this.extractTokenFromHeader(request.headers);
      if (!token) {
        throw new UnauthorizedException();
      }
      const user = await this.authService.getLoggedInUser(token);
      console.log('user', user.officialEmail);
      request['user'] = user;
      return true;
    } catch (e: any) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(headers: any): string | undefined {
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
