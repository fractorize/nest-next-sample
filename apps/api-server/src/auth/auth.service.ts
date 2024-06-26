import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@api/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(officialEmail: string, password: string) {
    const user = await this.userService.findOne(officialEmail);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { passwordHash, ...rest } = user;
    if (!passwordHash) {
      throw new UnauthorizedException('Not authorized to sign in');
    }
    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: user.id,
      officialEmail: user.officialEmail,
      companyId: user.companyId,
      roles: user.roles,
      ...user.employeeRecord,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
