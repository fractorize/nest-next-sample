import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const allowUnauthenticatedAccess = this.reflector.get<boolean>(
      'allowUnauthenticatedAccess',
      context.getHandler(),
    );
    if (allowUnauthenticatedAccess) {
      return true;
    }
    try {
      const user = await this.authService.getLoggedInUser(request);
      console.log('user', user.officialEmail);
      request['user'] = user;
    } catch (e: any) {
      throw new UnauthorizedException();
    }
    return true;
  }

}
