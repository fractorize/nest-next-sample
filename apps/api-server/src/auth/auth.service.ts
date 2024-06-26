import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException, Session } from '@nestjs/common';
import { UserService } from '@api/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(
    @Session() session: Record<string, any>,
    officialEmail: string,
    password: string,
  ) {
    //TODO: handle case where session is already active
    const user = await this.userService.findByOfficialEmail(officialEmail);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { passwordHash, roles, ...rest } = user;
    if (!passwordHash) {
      throw new UnauthorizedException('Not authorized to sign in');
    }
    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const permissions = roles.reduce((acc: any, role) => {
      role.permissions.forEach((permission) => {
        const resource = permission.resource?.uri;
        acc[resource] = acc[resource] || [];
        acc[resource].push(permission.type);
      });
      return acc;
    }, {});
    const payload = {
      id: rest.id,
      officialEmail: rest.officialEmail,
      companyId: rest.companyId,
      permissions,
      firstName: rest.employeeRecord.firstName,
      lastName: rest.employeeRecord.lastName,
      middleName: rest.employeeRecord.middleName,
    };
    session.user = payload;
    // WARNING: payload will be sent to the client. DO NOT include sensitive information
    return payload;
  }

  async logout(@Session() session: Record<string, any>) {
    session.destroy();
    return { message: 'Successfully signed out' };
  }
}
