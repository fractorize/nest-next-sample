import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Session() session: Record<string, any>,
    @Body() signInDto: Record<string, any>,
  ) {
    return this.authService.login(
      session,
      signInDto.officialEmail,
      signInDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Session() session: Record<string, any>) {
    return this.authService.logout(session);
  }
}
