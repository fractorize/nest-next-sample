import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessService } from './access.service';

@Injectable()
export class AccessGuard {
  constructor(
    private reflector: Reflector,
    private accessService: AccessService,
  ) {}

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const allowUnauthenticatedAccess = this.reflector.get<boolean>(
      'allowUnauthenticatedAccess',
      context.getHandler(),
    );
    if (allowUnauthenticatedAccess) {
      return true;
    }
    return this.accessService.canAllow(request);
  }
}
