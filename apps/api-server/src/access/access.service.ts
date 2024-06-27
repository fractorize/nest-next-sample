import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@api/user/user.service';

@Injectable()
export class AccessService {
  constructor(private userService: UserService) {}

  async isUserAuthorized(sessionUser: any, resource: any): Promise<boolean> {
    console.log('sessionUser', sessionUser);
    console.log('resource', resource);
    return true;
  }

  async canAllow(request: any): Promise<boolean> {
    if (!request.user) {
      throw new UnauthorizedException();
    }
    const {sub: userId, permissions} = request.user;
    const resource = request.route?.path;
    // const matchingPermittedResources = Object.keys(permissions).filter((resource) => {
    //   return resource === resource;
    // })
    console.log('sessionUser', userId);
    console.log('resource', resource);
    return true;
  }
}
