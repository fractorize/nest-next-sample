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

  async login(officialEmail: string, password: string) {
    if (!officialEmail || !password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const res = await this.userService.findByOfficialEmail(officialEmail);
    if (!res) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { passwordHash, user } = res;
    if (!passwordHash) {
      throw new UnauthorizedException('Not authorized to sign in');
    }
    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      accessToken: await this.jwtService.signAsync({
        ...user,
        sub: user.id,
        id: undefined,
      }),
    };
  }

  async logout() {
    return { message: 'Successfully signed out' };
  }
}
