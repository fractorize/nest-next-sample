import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException, Session } from '@nestjs/common';
import { UserService } from '@api/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(officialEmail: string, password: string) {
    //TODO: handle case where session is already active
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
    return user;
  }

  async logout() {
    return { message: 'Successfully signed out' };
  }
}
