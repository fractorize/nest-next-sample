import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessService } from './access.service';
import getRequestFromContext from '@api/utils/get-request-from-context';

@Injectable()
export class AccessGuard {
  constructor(
    private reflector: Reflector,
    private accessService: AccessService,
  ) {}

  async canActivate(context: any): Promise<boolean> {
    const request = getRequestFromContext(context);
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
