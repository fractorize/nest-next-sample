import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import AllowUnauthenticatedAccess from '@api/utils/allow-unauthenticated-access';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @AllowUnauthenticatedAccess()
  @Post('login')
  @UseInterceptors(NoFilesInterceptor())
  async login(@Body() signInDto: Record<string, any>) {
    return this.authService.login(signInDto.officialEmail, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
}
